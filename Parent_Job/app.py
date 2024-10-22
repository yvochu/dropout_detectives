from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson import json_util
import json
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
dropoutdb = mongo.db.dropouts
#################################################
# Flask Routes
#################################################
@app.route("/")
def home_page():
    return "Welcome to Drop Out Detectives"
@app.route("/alldropouts/", methods=["GET"])
@cross_origin()
def alldropoutdata():
    dropouts = dropoutdb.find({})
    dropoutsjson = json.loads(json_util.dumps(dropouts))
    return jsonify(dropoutsjson)
@app.route("/failures/", methods=["GET"])
@cross_origin()
def failures():
    number_failures = dropoutdb.find({}, {'_id': 0, 'Number_of_Failures': 1, 'Dropped_Out': 1})
    failuresjson = json.loads(json_util.dumps(number_failures))
    return jsonify(failuresjson)
@app.route("/alcohol/", methods=["GET"])
@cross_origin()
def alcohol():
    alcohol = dropoutdb.find({}, {"Weekend_Alcohol_Consumption": 1, "Going_Out": 1, "Dropped_Out": 1})
    alcoholjson = json.loads(json_util.dumps(alcohol))
    return jsonify(alcoholjson)
@app.route("/parental_status/", methods=["GET"])
@cross_origin()
def parental():
    parental_status = dropoutdb.find({}, {"Parental_Status": 1, "Dropped_Out": 1})
    parentaljson = json.loads(json_util.dumps(parental_status))
    return jsonify(parentaljson)
@app.route("/internet_access/", methods=["GET"])
@cross_origin()
def internet():
    internet_status = dropoutdb.find({}, {"Internet_Access": 1, 'Extra_Paid_Class': 1,
                                           'Extra_Curricular_Activities': 1, 'Final_Grade': 1, "Dropped_Out": 1})
    internetjson = json.loads(json_util.dumps(internet_status))
    return jsonify(internetjson)
@app.route("/parent_jobs/", methods=["GET"])
@cross_origin()
def parent_jobs():
    # Fetch mother job data
    mother_job = list(dropoutdb.aggregate([
        {"$match": {
            "Dropped_Out": True
        }},
        {"$group": {
            "_id": "$Mother_Job",
            "count": {"$sum": 1}
        }}
    ]))
    # Fetch father job data
    father_job = list(dropoutdb.aggregate([
        {"$match": {
            "Dropped_Out": True
        }},
        {"$group": {
            "_id": "$Father_Job",
            "count": {"$sum": 1}
        }}
    ]))
    # Return both datasets as JSON response
    results = {
        "mother_job_counts": json.loads(json_util.dumps(mother_job)),
        "father_job_counts": json.loads(json_util.dumps(father_job))
    }
    return jsonify(results)
if __name__ == "__main__":
    app.run()







# from flask import Flask, jsonify
# from flask_cors import CORS, cross_origin
# from flask_pymongo import PyMongo
# from bson import json_util
# import json
# from pprint import pprint

# #################################################
# # Flask Setup
# #################################################
# app = Flask(__name__)


# CORS(app, resources={
#     r"/*": {
#         "origins": "*"
#     }
# })
# app.config['CORS_HEADERS'] = 'Content-Type'
# app.config['CORS_ORIGINS'] = '*'

# app.config['DEBUG'] = True

# #################################################
# # Database Setup
# #################################################

# app.config['MONGO_URI'] = "mongodb://localhost:27017/dropout_project"
# mongo = PyMongo(app)

# dropout_project = mongo.db

# dropoutdb = mongo.db.dropouts

# #################################################
# # Flask Routes
# #################################################

# @app.route("/")
# def home_page():
#     return(
#         f"Welcome to Drop Out Detectives"
#     )

# @app.route("/alldropouts/", methods=["GET"])
# @cross_origin()
# def alldropoutdata():
    
#     dropouts = dropoutdb.find({})
#     dropoutsjson = json.loads(json_util.dumps(dropouts))
#     return jsonify(dropoutsjson)

# @app.route("/failures/", methods=["GET"])
# @cross_origin()
# def failures():

#     number_failures = dropoutdb.find({}, {'_id': 0, 'Number_of_Failures': 1, 'Dropped_Out': 1})
#     failuresjson = json.loads(json_util.dumps(number_failures))
#     return jsonify(failuresjson)

# @app.route("/alcohol/", methods=["GET"])
# @cross_origin()
# def alcohol():

#     alcohol = dropoutdb.find({}, {"Weekend_Alcohol_Consumption": 1, "Going_Out": 1, "Dropped_Out": 1})
#     alcoholjson = json.loads(json_util.dumps(alcohol))
#     return jsonify(alcoholjson)

# @app.route("/parental_status/", methods=["GET"])
# @cross_origin()
# def parental():

#     parental_status = dropoutdb.find({}, {"Parental_Status": 1, "Dropped_Out": 1})
#     parentaljson = json.loads(json_util.dumps(parental_status))
#     return jsonify(parentaljson)

# @app.route("/internet_access/", methods=["GET"])
# @cross_origin()
# def internet():

#     internet_status = dropoutdb.find({}, {"Internet_Access": 1, 'Extra_Paid_Class': 1,
#                                            'Extra_Curricular_Activities': 1, 'Final_Grade': 1, "Dropped_Out": 1})
#     internetjson = json.loads(json_util.dumps(internet_status))
#     return jsonify(internetjson)

# @app.route("/mother_job/", methods=["GET"])
# @cross_origin()
# def mother():
#     mother_job = list(dropoutdb.aggregate([
#         {"$match": {
#             "Dropped_Out": True
#         }},
#         {"$group": {
#             "_id": "$Mother_Job",
#             "count": {"$sum": 1}
#         }}
#     ]))
#     #mother_job = dropoutdb.find({}, {"Age": 1, 'Mother_Job': 1,  
#      #                                 'Family_Support': 1, "Dropped_Out": 1})
#     mother_job_counts = json.loads(json_util.dumps(mother_job))

#     # return jsonify(mother_job_counts)

# # @app.route("/father_job/", methods=["GET"])
# # @cross_origin()
# # def father():
#     father_job = list(dropoutdb.aggregate([
#         {"$match": {
#             "Dropped_Out": True
#         }},
#         {"$group": {
#             "_id": "$Father_Job",
#             "count": {"$sum": 1}
#         }}
#     ]))
#     return jsonify({
#         "mother_job_counts": json.loads(json_util.dumps(mother_job)),
#         "father_job_counts": json.loads(json_util.dumps(father_job))
#     })

#     #mother_job = dropoutdb.find({}, {"Age": 1, 'Mother_Job': 1,  
#      #                                 'Family_Support': 1, "Dropped_Out": 1})
#     # father_job_counts = json.loads(json_util.dumps(father_job))

#     # return jsonify(father_job_counts)
#     # return jsonify(results)

# if __name__ == "__main__":
#     app.run()