from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson import json_util
import json
from pprint import pprint

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'

app.config['DEBUG'] = True

#################################################
# Database Setup
#################################################

app.config['MONGO_URI'] = "mongodb://localhost:27017/dropout_project"
mongo = PyMongo(app)

dropout_project = mongo.db

dropoutdb = mongo.db.dropout

#################################################
# Flask Routes
#################################################

@app.route("/alldropouts/", methods=["GET"])
@cross_origin()
def alldropoutdata():
    
    dropouts = dropoutdb.find({})
    dropoutsjson = json.loads(json_util.dumps(dropouts))
    return jsonify(dropoutsjson)

@app.route("/failures/", methods=["GET"])
@cross_origin()
def failures():

    number_failures = list(dropoutdb.aggregate([
        {"$group": {
            "Number_of_Failures"
        }},
        {"$group": {
            "Dropped_Out"
        }},
    ]))

    failuresjson = json.loads(json_util.dumps(number_failures))
    return jsonify(failuresjson)

@app.route("/alcohol/", methods=["GET"])
@cross_origin()
def alcohol():

    alcohol = list(dropoutdb.aggregate([
        {"$group": {
            "Weekend_Alcohol_Consumption"
        }},
        {"$group": {
            "Going_Out"
        }},
        {"$group": {
            "Dropped_Out"
        }},
    ]))

    alcoholjson = json.loads(json_util.dumps(alcohol))
    return jsonify(alcoholjson)

@app.route("/parental_status/", methods=["GET"])
@cross_origin()
def alcohol():

    parental_status = list(dropoutdb.aggregate([
        {"$group": {
            "Parental_Status"
        }},
        {"$group": {
            "Dropped_Out"
        }},
    ]))

    parentaljson = json.loads(json_util.dumps(parental_status))
    return jsonify(parentaljson)

@app.route("/internet_access/", methods=["GET"])
@cross_origin()
def alcohol():

    internet_status = list(dropoutdb.aggregate([
        {"$group": {
            "Internet_Access"
        }},
        {"$group": {
            'Extra_Paid_Class'
        }},
        {"$group": {
            'Extra_Curricular_Activities'
        }},
        {"$group": {
            'Final_Grade'
        }},
        {"$group": {
            "Dropped_Out"
        }},
    ]))

    internetjson = json.loads(json_util.dumps(internet_status))
    return jsonify(internetjson)

@app.route("/parents_job/", methods=["GET"])
@cross_origin()
def alcohol():

    parents_job = list(dropoutdb.aggregate([
        {"$group": {
            "Age"
        }},
        {"$group": {
            'Mother_Job'
        }},
        {"$group": {
            'Father_Job'
        }},
        {"$group": {
            'Family_Support'
        }},
        {"$group": {
            "Dropped_Out"
        }},
    ]))

    parents_job_json = json.loads(json_util.dumps(parents_job))
    return jsonify([parents_job_json])

if __name__ == "__main__":
    app.run()