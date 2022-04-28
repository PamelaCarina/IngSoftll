from flask import Flask, jsonify, request
from flask import render_template
from flask_sqlalchemy import SQLAlchemy #lo mismo para sqlalchemy
from flask_marshmallow import Marshmallow
from pip import main

app = Flask(__name__,template_folder="../Frontend")

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Crimax123@localhost/flaskmysql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app) #le pasaremos los datos de arriba al ORM, una vez esto se ejecute nos entregara una ainstancia de una base de datos guardada en la vairable db
ma = Marshmallow(app) #instancia del modulo de marshmallow que nos permiote la interaccion

Tag_encuesta = db.Table('Tag_encuesta', #TABLA MANY TO MANY QUE RELACIONA A ENCUESTADO CON ENCUESTA
    db.Column('id_tag', db.Integer, db.ForeignKey('tag.id_tag')),
    db.Column('id_encuesta', db.Integer, db.ForeignKey('encuesta.id_encuesta'))
)


Contesta_encuesta = db.Table('Contesta_encuesta',  #TABLA MANY TO MANY QUE RELACIONA A ENCUESTADO CON ENCUESTA
    db.Column('id_encuestado', db.Integer, db.ForeignKey('encuestado.id_encuestado')),
    db.Column('id_encuesta', db.Integer, db.ForeignKey('encuesta.id_encuesta')),
    db.Column('fecha_contestacion', db.String(30))
)

# TABLAS DE LA BASE DE DATOS
class Encuestado(db.Model):  # CLASE ENCUESTADO
    id_encuestado = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(40))
    encuestas = db.relationship('Encuesta', secondary=Contesta_encuesta, backref=db.backref('Encuestados_backref'),
                                lazy='dynamic')

    def __init__(self, correo, ):
        self.correo = correo


class Tag(db.Model): #CLASE TAG
    id_tag = db.Column(db.Integer, primary_key = True)
    tag = db.Column(db.String(20))
    encuestas = db.relationship('Encuesta', secondary = Tag_encuesta, backref = db.backref('Tags_backref'), lazy = 'dynamic')

    def __init__(self, tag,):
        self.tag = tag

class Editor(db.Model): #CLASE EDITOR
    id_editor = user = db.Column(db.Integer, primary_key = True)
    user = db.Column(db.String(30))
    password = db.Column(db.String(30), unique = True)
    encuestas = db.relationship('Encuesta', backref = 'editor')

    def __init__(self, user, password):
        self.user = user
        self.password = password


class Encuesta(db.Model): #CLASE ENCUESTA
    id_encuesta = db.Column(db.Integer, primary_key = True)
    titulo = db.Column(db.String(200))
    fecha_creacion = db.Column(db.String(30))
    user = db.Column(db.String(30), unique = True)
    encuestados =db.relationship('Encuestado', secondary = Contesta_encuesta, backref = db.backref('encuestas_backref'), lazy = 'dynamic')
    tags =db.relationship('Tag', secondary = Tag_encuesta, backref = db.backref('encuestas_backref'), lazy = 'dynamic')
    id_editor = db.Column(db.Integer, db.ForeignKey('editor.id_editor'))
    preguntas = db.relationship('Pregunta', backref = 'encuesta')

    def __init__(self, id_encuesta, titulo, fecha_creacion, user):
        self.id_encuesta = id_encuesta
        self.titulo = titulo
        self.fecha_creacion = fecha_creacion
        self.user = user


class Pregunta(db.Model):  # CLASE PREGUNTA
    id_pregunta = db.Column(db.Integer, primary_key=True)
    enunciado = db.Column(db.String(200))
    id_encuesta = db.Column(db.Integer, db.ForeignKey('encuesta.id_encuesta'))
    alternativas = db.relationship('Alternativa', backref='pregunta')

    def __init__(self, id_pregunta, enunciado):
        self.id_pregunta = id_pregunta
        self.enunciado = enunciado


class Alternativa(db.Model): #CLASE ALTERNATIVA
    id_alternativa = db.Column(db.Integer, primary_key = True)
    enunciado = db.Column(db.String(200))
    contador = db.Column(db.String(30))
    id_pregunta = db.Column(db.Integer, db.ForeignKey('pregunta.id_pregunta'))

    def __init__(self, id_alternativa, enunciado, contador):
        self.id_alternativa = id_alternativa
        self.enunciado = enunciado
        self.contador = contador


db.create_all() #con este metodo crearemos todas nuestras tablas al instante


class EncuestadoSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_encuestado', 'correo') #campos que queremos obtener cada vez que interactuemos con este esquema

encuestado_schema = EncuestadoSchema() #instancia de un task schema
encuestados_schema = EncuestadoSchema(many = True) #instancia en caso de querer crear mas de un task schema


class EncuestaSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_encuesta', 'titulo_encuesta', 'descripcion_encuesta') #campos que queremos obtener cada vez que interactuemos con este esquema

encuesta_schema = EncuestaSchema()


class PreguntaSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_pregunta', 'id_encuesta', 'enunciado_pregunta') #campos que queremos obtener cada vez que interactuemos con este esquema

pregunta_schema = PreguntaSchema()


class AlternativaSchema(ma.Schema):
    class Meta: #definimos una clase meta
        fields = ('id_alternativa', 'id_pregunta', 'enunciado_alternativa', 'contador_alternativa') #campos que queremos obtener cada vez que interactuemos con este esquema

alternativa_schema = AlternativaSchema()


@app.route("/saveEncuesta", methods=['POST'])
def saveEncuesta():
    if request.method == 'POST':
        data = request.get_json()
        id_encuesta = data['id_encuesta']
        titulo_encuesta = data['titulo_encuesta']
        descripcion_encuesta = data['descripcion_encuesta']
        new_encuesta = Encuesta(id_encuesta, titulo_encuesta, descripcion_encuesta)
        #tag_encuesta = data['tag_encuesta']
        db.session.add(new_encuesta)
        for p in data['preguntas']:
            id_pregunta = p['id_pregunta']
            enunciado_pregunta = p['enunciado_pregunta']
            new_pregunta = Pregunta(id_pregunta, id_encuesta, enunciado_pregunta)
            db.session.add(new_pregunta)
            for a in p['alternativas']:
                id_alternativa = data['id_alternativa']
                enunciado_alternativa = data['enunciado_alternativa']
                contador_alternativa = data['contador_alternativa']
                new_alternativa = Alternativa(id_alternativa, id_pregunta, enunciado_alternativa, contador_alternativa)
                db.session.add(new_alternativa)
        db.session.commit()


@app.route("/getEncuestas", methods=['GET'])
def getEncuestas():
    encuestas = Encuesta.query.all()  # consultamos todas las tareas, esto lo guardaremos en una variable llamada all_tasks
    result = encuesta_schema.dump(encuestas)  # necesitamos usar desde el schema el metodo llamado dump que utilizamos losmetodos que nos ha devuelto la consulta anterior
    return jsonify(result)


if __name__ == "__main__":
    app.run()
