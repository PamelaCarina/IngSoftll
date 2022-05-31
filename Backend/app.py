import datetime
import json

from flask import Flask, jsonify, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_mail import Mail, Message

####### APP CONFIG (APP, DB, MAIL) #######
from sqlalchemy import func

app = Flask(__name__)
mail = Mail(app)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/is2flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'correo@gmail.com'
app.config['MAIL_PASSWORD'] = 'password'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)

####### MODELOS Y SCHEMAS #######
Tag_encuesta = db.Table('Tag_encuesta', #TABLA MANY TO MANY QUE RELACIONA A ENCUESTADO CON ENCUESTA
    db.Column('tag', db.String(20), db.ForeignKey('tag.tag')),
    db.Column('id_encuesta', db.Integer, db.ForeignKey('encuesta.id_encuesta'))
)

Contesta_encuesta = db.Table('Contesta_encuesta',  #TABLA MANY TO MANY QUE RELACIONA A ENCUESTADO CON ENCUESTA
    db.Column('correo_encuestado', db.String(40), db.ForeignKey('encuestado.correo_encuestado')),
    db.Column('id_encuesta', db.Integer, db.ForeignKey('encuesta.id_encuesta')),
    db.Column('fecha_contestacion', db.String(30))
)

class Encuestado(db.Model):  # CLASE ENCUESTADO
    correo_encuestado = db.Column(db.String(40), primary_key=True)
    encuestas = db.relationship('Encuesta', secondary=Contesta_encuesta, backref=db.backref('Encuestados_backref'),
                                lazy='dynamic')

    def __init__(self, correo_encuestado):
        self.correo_encuestado = correo_encuestado


class Tag(db.Model): #CLASE TAG
    tag = db.Column(db.String(20), primary_key=True)
    encuestas = db.relationship('Encuesta', secondary=Tag_encuesta, backref=db.backref('Tags_backref'), lazy = 'dynamic')

    def __init__(self, tag):
        self.tag = tag


class Editor(db.Model): #CLASE EDITOR
    id_editor = db.Column(db.Integer, primary_key=True)
    correo_editor = db.Column(db.String(30), unique=True)
    password = db.Column(db.String(30), unique=True)
    encuestas = db.relationship('Encuesta', backref='editor')

    def __init__(self, id_editor, correo_editor, password):
        self.id_editor = id_editor
        self.correo_editor = correo_editor
        self.password = password


class Pregunta(db.Model):  # CLASE PREGUNTA
    id_pregunta = db.Column(db.Integer, primary_key=True)
    id_encuesta = db.Column(db.Integer, db.ForeignKey('encuesta.id_encuesta'))
    enunciado_pregunta = db.Column(db.String(200))
    alternativas = db.relationship('Alternativa', backref='pregunta')

    def __init__(self, id_pregunta, id_encuesta, enunciado_pregunta):
        self.id_pregunta = id_pregunta
        self.id_encuesta = id_encuesta
        self.enunciado_pregunta = enunciado_pregunta


class Alternativa(db.Model): #CLASE ALTERNATIVA
    id_alternativa = db.Column(db.Integer, primary_key=True)
    id_pregunta = db.Column(db.Integer, db.ForeignKey('pregunta.id_pregunta'))
    enunciado_alternativa = db.Column(db.String(200))
    contador = db.Column(db.Integer)

    def __init__(self, id_alternativa, id_pregunta, enunciado_alternativa, contador):
        self.id_alternativa = id_alternativa
        self.id_pregunta = id_pregunta
        self.enunciado_alternativa = enunciado_alternativa
        self.contador = contador


class Encuesta(db.Model): #CLASE ENCUESTA
    id_encuesta = db.Column(db.Integer, primary_key=True)
    id_editor = db.Column(db.Integer, db.ForeignKey('editor.id_editor'))
    titulo_encuesta = db.Column(db.String(200))
    descripcion_encuesta = db.Column(db.String(200))
    fecha_creacion = db.Column(db.String(30))
    encuestados = db.relationship('Encuestado', secondary=Contesta_encuesta, backref=db.backref('encuestas_backref'), lazy = 'dynamic')
    tags = db.relationship('Tag', secondary=Tag_encuesta, backref=db.backref('encuestas_backref'), lazy='dynamic')
    preguntas = db.relationship('Pregunta', backref='encuesta')

    def __init__(self, id_encuesta, id_editor, titulo_encuesta, descripcion_encuesta, fecha_creacion):
        self.id_encuesta = id_encuesta
        self.id_editor = id_editor
        self.titulo_encuesta = titulo_encuesta
        self.descripcion_encuesta= descripcion_encuesta
        self.fecha_creacion = fecha_creacion


db.create_all()


class EditorSchema(ma.Schema):
    class Meta:
        fields = ('id_editor', 'correo_editor', 'password')

editor_schema = EditorSchema()
editor_schema = EditorSchema(many=True, only=("id_editor","correo_editor"))


class TagSchema(ma.Schema):
    class Meta:
        attribute = 'tag'

tag_schema = TagSchema()
tag_schema = TagSchema(many=True)


class EncuestadoSchema(ma.Schema):
    class Meta:
        attribute = 'correo_encuestado'

encuestado_schema = EncuestadoSchema()
encuestados_schema = EncuestadoSchema(many=True)

class EncuestaSchema(ma.Schema):
    class Meta:
        fields = ('id_encuesta', 'id_editor', 'titulo_encuesta', 'descripcion_encuesta', 'fecha_creacion')

encuesta_schema = EncuestaSchema()
encuesta_schema = EncuestaSchema(many=True)


class PreguntaSchema(ma.Schema):
    class Meta:
        fields = ('id_pregunta', 'id_encuesta', 'enunciado_pregunta')

pregunta_schema = PreguntaSchema()
pregunta_schema = PreguntaSchema(many=True)


class AlternativaSchema(ma.Schema):
    class Meta:
        fields = ('id_alternativa', 'id_pregunta', 'enunciado_alternativa', 'contador')

alternativa_schema = AlternativaSchema()
alternativa_schema = AlternativaSchema(many=True)


####### RUTAS #######

###ENCUESTADO###
@app.route("/saveRespuestas", methods=['PUT'])
def saveRespuestas():
    data = request.get_json()
    for datos in data['dict']:
        for [key,value] in datos.items():
            if(key == 'idEnc'):
                id = value
            elif(key == 'corrEnc') :
                correo = value

    exists = db.session.query(db.exists().where(Encuestado.correo_encuestado == correo)).scalar()
    encuesta = db.session.query(Encuesta).filter(Encuesta.id_encuesta == id).first()
    if exists is False:  # si es un correo nuevo, se añade
        encuestado = Encuestado(correo_encuestado=correo)
        encuestado.encuestas.append(encuesta, fecha_contestacion=datetime.datetime.now().date())
        db.session.add(encuestado)
    else:
        encuestado = db.session.query(Encuestado).filter(Encuestado.correo_encuestado == correo).first()
        contestada = False
        for enc in encuestado.encuestas:
            if(enc.id_encuesta == id):
                contestada = True

        if contestada is True:
            return Response("Ya ha contestado esta encuesta", status=400)
        else:
            encuestado.encuestas.append(encuesta)

    #actualiza los contadores de alternativas
    for alts in data['dict']:
        for [key,value] in alts.items():
            if(key == 'idAlt'):
                alt = Alternativa.query.get(value)
                alt.contador = alt.contador+1

    db.session.commit()
    return Response("Contestada correctamente", status=200)


###EDITOR###
#@app.route("/login")
#@app.route("/signIn")

@app.route("/getUser/<idEd>", methods=['GET'])
def getUser(idEd):
    editor = db.session.query(Editor).where(Editor.id_editor == idEd)
    result = editor_schema.dump(editor)
    return jsonify(result)


#@app.route("/editEncuesta")

@app.route("/deleteEncuesta/<idE>", methods=['DELETE'])
def deleteEncuesta(idE):
    pregs = Pregunta.query.filter(Pregunta.id_encuesta == idE)
    for p in pregs:
        Alternativa.query.filter(Alternativa.id_pregunta == p.id_pregunta).delete()
        #alts = Alternativa.query.filter(Alternativa.id_pregunta == p.id_pregunta)
        #    print(a.id_alternativa)
        #    print("***********")
        db.session.delete(p)
    Encuesta.query.filter(Encuesta.id_encuesta == idE).delete()
    db.session.commit()
    return 'lol'


@app.route("/listadoEncuestas/<idEditor>", methods=['GET'])
def listaEncuestas(idEditor):
    encuestasEd = db.session.query(Encuesta).where(Encuesta.id_editor == idEditor)
    result = encuesta_schema.dump(encuestasEd)
    return jsonify(result)


@app.route("/showEncuesta/<idEncuesta>", methods=['GET'])
def showEncuesta(idEncuesta):
    if request.method == 'GET':
        encuesta = db.session.query(Encuesta).where(Encuesta.id_encuesta == idEncuesta)
        preguntas = db.session.query(Pregunta).where(Pregunta.id_encuesta == idEncuesta)
        alternativas = db.session.query(Alternativa).join(Pregunta).where(Alternativa.id_pregunta == Pregunta.id_pregunta and Pregunta.id_encuesta == idEncuesta).all()
        resultE = encuesta_schema.dump(encuesta)
        resultP = pregunta_schema.dump(preguntas)
        resultA = alternativa_schema.dump(alternativas)
        return jsonify(resultE, resultP, resultA)


@app.route("/saveEncuesta", methods=['POST'])
def saveEncuesta():
    if request.method == 'POST':
        #Extraigo el JSON de la request
        abc = request.get_json()
        data = json.dumps(abc['dict'])
        data =json.loads(data)
        #Se obtienen los id máximos de las encuestas, preguntas y alternativas
        if db.session.query(func.max(Encuesta.id_encuesta)).scalar() == None:
            id_encuesta = 1
        else:
            id_encuesta = db.session.query(func.max(Encuesta.id_encuesta)).scalar()+1;

        if db.session.query(func.max(Pregunta.id_pregunta)).scalar() == None :
            max_id_pregunta = 1
        else:
            max_id_pregunta = db.session.query(func.max(Pregunta.id_pregunta)).scalar()+1

        if db.session.query(func.max(Alternativa.id_alternativa)).scalar() == None:
            max_id_alternativa = 1
        else:
            max_id_alternativa = db.session.query(func.max(Alternativa.id_alternativa)).scalar()+1

        #Se extraen los datos de la encuesta
        for element in data:
            for att, value in element.items():
                if att == 'titulo_encuesta':
                    titulo_encuesta = value
                if att == 'descripcion_encuesta':
                    descripcion_encuesta = value
                if att == 'preguntas':
                    preguntas = value

        # Se crea una nueva encuesta
        fecha_creacion = datetime.datetime.now().date()
        new_encuesta = Encuesta(id_encuesta, 1, titulo_encuesta, descripcion_encuesta, fecha_creacion)
        """
        # Se extraen los tags de la encuesta
        se necesita: 
        recibir todos lostags 
        verificar si el tag existe
        almacenar los tags en:
        TagEncuesta, Tag
        for t in data['tag_encuesta']:
            new_tag = Tag_encuesta(t['id_tag'], id_encuesta)
            db.session.add(new_tag)
        tag_encuesta = data['tag_encuesta']
        """
        # Se añade el objeto encuesta a la BD
        db.session.add(new_encuesta)
        #Se itera por la preguntas
        for p in preguntas:
            # Se extraen los datos de las preguntas
            for att, value in p.items():
                if att == 'enunciado_pregunta':
                    enunciado_pregunta = value
                    # Se crea la nueva pregunta y se almacena
                    new_pregunta = Pregunta(max_id_pregunta, id_encuesta, enunciado_pregunta)
                    db.session.add(new_pregunta)
                if att == 'alternativas':
                    alternativas = value
                    # Se itera por las alternativas de una pregunta
                    for a in alternativas:
                        # Se extraen los datos de las alternativas
                        for att, value in a.items():
                            if att == 'enunciado_alternativa':
                                enunciado_alternativa = value
                                # Se crea la nueva alternativa y se almacena
                                new_alternativa = Alternativa(max_id_alternativa, max_id_pregunta,enunciado_alternativa, 0)
                                db.session.add(new_alternativa)
                                max_id_alternativa += 1
            max_id_pregunta += 1
        #Se guardan los cambios realizados en la BD
        db.session.commit()
        return "ok"


@app.route("/viewCorreos/",methods=['GET','POST']) #POST es para editar correo
def viewCorreos():
    if request.method=='POST': #editar correo
        correo=request.form('correo_encuestado')
        encuestado=Encuestado.query.get_or_404(correo)
        encuestado.correo_encuestado=correo
        db.session.add(encuestado)
        db.session.commit()
    return

@app.route("/<int:id_encuestado>/ingresarCorreo/",methods=['POST'])
def ingresarCorreo(correo):
    encuestado=Encuestado(correo_encuestado=correo)
    db.session.add(encuestado)
    db.session.commit()
    return redirect(url_for('index')) #cambiar link

@app.route("/<int:id_encuestado>/eliminarCorreo/",methods=['POST'])
def eliminarCorreo(correo): #¿se refiere a eliminar al usuario?
    #tal vez deberia usarse correo como id
    encuestado=Encuestado.query.get_or_404(correo)
    db.session.delete(encuestado)
    db.session.commit()
    return redirect(url_for('index')) #Cambiar link

@app.route("/filtrarCorreo",methods=['GET','POST'])
def filtrarCorreo(tag):
    if request.method=='POST':
        #obtiene lista de correos filtrados
        correos=db_session.query(Encuestado).join(Tag_encuesta).filter(Tag_encuesta.id_tag==tag)
        #enviar a front end la lista de correos filtrados
        return jsonify(correos)
    return render_template('index.html')

#@app.post("/<int:id_encuesta>/sendCorreos/")
#def sendCorreos(id_encuesta):
#   link="surveycado.com/encuesta/ "+id_encuesta
@app.route("/sendCorreos/",methods=['POST']) #envia los correos para una encuesta dada a toda la lista de correos
def sendCorreos():
    link="surveycado.com/encuesta/"
    link_html='<a href='+link+'>'+link+'</a>'
    users=Encuestado.query.with_entities(Encuestado.correo_encuestado).all() #recibir solo correos
    with mail.connect() as conn:
        for user in users:
            msg=Message('subject', sender=("Surveycado 🥑",'esalini2017@inf.udec.cl'),recipients=[''.join(user)])
            msg.body="Link encuesta "+link_html
            mail.send(msg)
    return "Mensajes enviados."

if __name__ == "__main__":
    app.run()
