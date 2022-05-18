from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

####### APP CONFIG (APP, DB, MAIL) #######
app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/is2flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app) #le pasaremos los datos de arriba al ORM, una vez esto se ejecute nos entregara una ainstancia de una base de datos guardada en la vairable db
ma = Marshmallow(app) #instancia del modulo de marshmallow que nos permiote la interaccion

####### MODELOS Y SCHEMAS #######
Tag_encuesta = db.Table('Tag_encuesta', #TABLA MANY TO MANY QUE RELACIONA A ENCUESTADO CON ENCUESTA
    db.Column('id_tag', db.Integer, db.ForeignKey('tag.id_tag')),
    db.Column('id_encuesta', db.Integer, db.ForeignKey('encuesta.id_encuesta'))
)

Contesta_encuesta = db.Table('Contesta_encuesta',  #TABLA MANY TO MANY QUE RELACIONA A ENCUESTADO CON ENCUESTA
    db.Column('id_encuestado', db.Integer, db.ForeignKey('encuestado.id_encuestado')),
    db.Column('id_encuesta', db.Integer, db.ForeignKey('encuesta.id_encuesta')),
    db.Column('fecha_contestacion', db.String(30))
)

class Encuestado(db.Model):  # CLASE ENCUESTADO
    id_encuestado = db.Column(db.Integer, primary_key=True)
    correo_encuestado = db.Column(db.String(40))
    encuestas = db.relationship('Encuesta', secondary=Contesta_encuesta, backref=db.backref('Encuestados_backref'),
                                lazy='dynamic')

    def __init__(self, id_encuestado, correo_encuestado):
        self.id_encuestado = id_encuestado
        self.correo_encuestado = correo_encuestado


class Tag(db.Model): #CLASE TAG
    id_tag = db.Column(db.Integer, primary_key=True)
    nombre_tag = db.Column(db.String(20), unique=True)
    encuestas = db.relationship('Encuesta', secondary=Tag_encuesta, backref=db.backref('Tags_backref'), lazy = 'dynamic')

    def __init__(self, id_tag, nombre_tag):
        self.id_tag = id_tag
        self.nombre_tag = nombre_tag


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
    contador = db.Column(db.String(30))

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


db.create_all() #con este metodo crearemos todas nuestras tablas al instante


class EditorSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_editor', 'correo_editor', 'password') #campos que queremos obtener cada vez que interactuemos con este esquema

editor_schema = EditorSchema() #instancia de un task schema
editor_schema = EditorSchema(many=True) #instancia en caso de querer crear mas de un task schema


class TagSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_tag', 'nombre_tag') #campos que queremos obtener cada vez que interactuemos con este esquema

tag_schema = TagSchema() #instancia de un task schema
tag_schema = TagSchema(many=True) #instancia en caso de querer crear mas de un task schema


class EncuestadoSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_encuestado', 'correo_encuestado') #campos que queremos obtener cada vez que interactuemos con este esquema

encuestado_schema = EncuestadoSchema() #instancia de un task schema
encuestados_schema = EncuestadoSchema(many=True) #instancia en caso de querer crear mas de un task schema


class EncuestaSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_encuesta', 'id_editor', 'titulo_encuesta', 'descripcion_encuesta', 'fecha_creacion') #campos que queremos obtener cada vez que interactuemos con este esquema

encuesta_schema = EncuestaSchema()
encuesta_schema = EncuestaSchema(many=True)


class PreguntaSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_pregunta', 'id_encuesta', 'enunciado_pregunta') #campos que queremos obtener cada vez que interactuemos con este esquema

pregunta_schema = PreguntaSchema()
pregunta_schema = PreguntaSchema(many=True)


class AlternativaSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_alternativa', 'id_pregunta', 'enunciado_alternativa', 'contador') #campos que queremos obtener cada vez que interactuemos con este esquema

alternativa_schema = AlternativaSchema()
alternativa_schema = AlternativaSchema(many=True)



####### RUTAS #######

###ENCUESTADO###
#@app.route("/saveRespuestas")
@app.route("/showEncuesta/<idEncuesta>", methods=['GET'])
def showEncuesta(idEncuesta):
    if request.method == 'GET':
        print(idEncuesta)
        #encuesta = db.session.query(Encuesta).join(Pregunta).where(Pregunta.id_encuesta == 1).all()
        encuesta = db.session.query(Encuesta).where(Encuesta.id_encuesta == idEncuesta)
        preguntas = db.session.query(Pregunta).where(Pregunta.id_encuesta == idEncuesta)
        alternativas = db.session.query(Alternativa).join(Pregunta).where(Alternativa.id_pregunta == Pregunta.id_pregunta and Pregunta.id_encuesta == idEncuesta).all()
        resultE = encuesta_schema.dump(encuesta)
        resultP = pregunta_schema.dump(preguntas)
        resultA = alternativa_schema.dump(alternativas)
        #print(resultA)
        return jsonify(resultE, resultP, resultA)



###EDITOR###
#@app.route("/login")
#@app.route("/signIn")
@app.route("/listadoEncuestas/<idEditor>", methods=['GET'])
def listaEncuestas(idEditor):
    encuestasEd = db.session.query(Encuesta).where(Encuesta.id_editor == idEditor)
    result = encuesta_schema.dump(encuestasEd)
    return jsonify(result)

#@app.route("/listadoEncuestados")
#@app.route("/sendEMails")
#@app.route("/editEncuesta")
#@app.route("/deleteEncuesta")
#@app.route("/editEncuestado")
#@app.route("/deleteEncuestado")
#@app.route("/ingresarEncuestado")

@app.route("/saveEncuesta", methods=['POST'])
def saveEncuesta():
    if request.method == 'POST':
        #Extraigo el JSON de la request
        data = request.get_json()
        #Se obtienen los id máximos de las encuestas, preguntas y alternativas
        id_encuesta = db.session.query(Encuesta).select_from(Encuesta).count()+1
        max_id_pregunta = db.session.query(Pregunta).select_from(Pregunta).count()+1
        max_id_alternativa = db.session.query(Alternativa).select_from(Alternativa).count()+1
        #Se extraen los daots de la encuesta
        titulo_encuesta = data['titulo_encuesta']
        descripcion_encuesta = data['descripcion_encuesta']
        #Se crea una nueva encuesta
        fecha_creacion = "11-05-2022"
        new_encuesta = Encuesta(id_encuesta, 1, titulo_encuesta, descripcion_encuesta, fecha_creacion)
        #Se extraen los tags de la encuesta
        """
        se necesita:
            recibir todos los tags
            verificar si el tag existe
            almacenar los tags en:
                TagEncuesta
                Tag
        for t in data['tag_encuesta']:
            new_tag = Tag_encuesta(t['id_tag'], id_encuesta)
            db.session.add(new_tag)
        tag_encuesta = data['tag_encuesta']
        """
        #Se añade el objeto encuesta a la BD
        db.session.add(new_encuesta)
        #Se itera por la preguntas
        for p in data['preguntas']:
            #Se extrane los datos de las preguntas
            #id_pregunta = p['id_pregunta']
            enunciado_pregunta = p['enunciado_pregunta']
            #Se crea la nueva pregunta y se almacena
            new_pregunta = Pregunta(max_id_pregunta, id_encuesta, enunciado_pregunta)
            db.session.add(new_pregunta)
            #Se itera por las alternativas de una pregunta
            for a in p['alternativas']:
                #Se extraen los datos de las alternativas
                #id_alternativa = a['id_alternativa']
                enunciado_alternativa = a['enunciado_alternativa']
                #Se crea la nueva alternativa y se almacena
                new_alternativa = Alternativa(max_id_alternativa, max_id_pregunta, enunciado_alternativa, 0)
                db.session.add(new_alternativa)
                max_id_alternativa += 1
            max_id_pregunta += 1
        #Se guardan los cambios realizados en la BD
        db.session.commit()
        return "ok"


@app.route("/getEncuestas", methods=['GET'])
def getEncuestas():
    encuestas = Encuesta.query.all()  # consultamos todas las tareas, esto lo guardaremos en una variable llamada all_tasks
    result = encuesta_schema.dump(encuestas)  # necesitamos usar desde el schema el metodo llamado dump que utilizamos losmetodos que nos ha devuelto la consulta anterior
    return jsonify(result)


if __name__ == "__main__":
    app.run()
