# ============================================================
# MediQR - Flask Backend
# Member 2: Backend + API Development
# Member 3: Oracle Database
# ============================================================


# ============================================================
# 1. IMPORT REQUIRED LIBRARIES
# ============================================================

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os


# ============================================================
# 2. CREATE FLASK APPLICATION
# ============================================================

app = Flask(__name__)

# Allows frontend JavaScript to communicate with Flask
CORS(app)


# ============================================================
# 3. FRONTEND FOLDER LOCATION
# ============================================================

# Project structure:
#
# MeDiqr/
#   ├── backend/
#   │     └── app.py
#   │
#   └── frontend/
#         ├── login.html
#         ├── register.html
#         ├── login.css
#         ├── register.css
#         ├── login.js
#         ├── register.js
#         └── images...
#

FRONTEND_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "frontend"
)


# ============================================================
# 4. HOME PAGE
# ============================================================

# When we open:
#
# http://127.0.0.1:5000/
#
# Flask displays login.html.

@app.route("/")
def home():

    return send_from_directory(
        FRONTEND_FOLDER,
        "login.html"
    )


# ============================================================
# 5. SERVE FRONTEND FILES
# ============================================================

# This allows Flask to serve:
#
# HTML
# CSS
# JavaScript
# Images
#
# from the frontend folder.

@app.route("/<path:filename>")
def frontend_files(filename):

    return send_from_directory(
        FRONTEND_FOLDER,
        filename
    )


# ============================================================
# 6. LOGIN API
# ============================================================

# Frontend sends:
#
# POST /api/login
#
# Example:
#
# {
#     "email": "patient@gmail.com",
#     "password": "123456",
#     "role": "patient"
# }
#
# Currently this API does NOT check Oracle.
# It only receives the login information.
#
# Later:
#
# Flask → Oracle → Check email/password → Login


@app.route("/api/login", methods=["POST"])
def login():

    # Get JSON data from frontend
    data = request.get_json()

    # Check whether data was received
    if not data:

        return jsonify({
            "success": False,
            "message": "No login data received"
        }), 400

    # Get login values
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    # Print information in terminal
    # This is useful for testing.

    print("================================")
    print("LOGIN REQUEST RECEIVED")
    print("Email:", email)
    print("Role:", role)
    print("================================")

    # Validate required fields

    if not email or not password or not role:

        return jsonify({
            "success": False,
            "message": "Email, password and role are required"
        }), 400

    # Temporary response
    #
    # Later Oracle validation will be added here.

    return jsonify({
        "success": True,
        "message": "Login request received successfully",
        "role": role
    })


# ============================================================
# 7. PATIENT REGISTRATION API
# ============================================================

# Frontend sends:
#
# POST /api/register
#
# The registration page sends patient information here.
#
# Currently we only RECEIVE the data.
#
# We are NOT saving it into Oracle yet.
#
# Member 3 will handle Oracle database integration.


@app.route("/api/register", methods=["POST"])
def register():

    # Get JSON data from frontend
    data = request.get_json()

    # Check whether data was received

    if not data:

        return jsonify({
            "success": False,
            "message": "No registration data received"
        }), 400

    # Get registration fields

    full_name = data.get("full_name")
    date_of_birth = data.get("date_of_birth")
    gender = data.get("gender")
    blood_group = data.get("blood_group")
    mobile = data.get("mobile")
    email = data.get("email")
    password = data.get("password")
    height = data.get("height")
    weight = data.get("weight")
    allergies = data.get("allergies")
    emergency_name = data.get("emergency_name")
    emergency_phone = data.get("emergency_phone")
    address = data.get("address")


    # ========================================================
    # PRINT DATA FOR TESTING
    # ========================================================

    print("================================")
    print("REGISTRATION REQUEST RECEIVED")

    print("Name:", full_name)
    print("Date of Birth:", date_of_birth)
    print("Gender:", gender)
    print("Blood Group:", blood_group)
    print("Mobile:", mobile)
    print("Email:", email)
    print("Height:", height)
    print("Weight:", weight)
    print("Allergies:", allergies)
    print("Emergency Name:", emergency_name)
    print("Emergency Phone:", emergency_phone)
    print("Address:", address)

    print("================================")


    # ========================================================
    # CHECK REQUIRED FIELDS
    # ========================================================

    if not full_name or not email or not password:

        return jsonify({
            "success": False,
            "message": "Full name, email and password are required"
        }), 400


    # ========================================================
    # TEMPORARY RESPONSE
    # ========================================================

    # IMPORTANT:
    #
    # We are NOT saving data into Oracle yet.
    #
    # Later:
    #
    # Frontend
    #     ↓
    # /api/register
    #     ↓
    # Flask
    #     ↓
    # Oracle Database
    #     ↓
    # Patient table
    #
    # Member 3 will provide the Oracle database details.

    return jsonify({

        "success": True,

        "message": "Registration request received successfully"

    })


# ============================================================
# 8. PATIENT PROFILE API
# ============================================================

# GET /api/profile
#
# Currently this returns sample data.
#
# Later the information will come from Oracle.


@app.route("/api/profile", methods=["GET"])
def profile():

    patient = {

        "name": "Patient Name",

        "patient_id": "MQ100245",

        "status": "Active",

        "date_of_birth": "--/--/----",

        "gender": "--",

        "phone": "+91 XXXXXXXXXX",

        "email": "patient@email.com",

        "blood_group": "--",

        "height": "-- cm",

        "weight": "-- kg",

        "allergies": "None",

        "chronic_disease": "None",

        "emergency_name": "--",

        "emergency_relation": "--",

        "emergency_phone": "+91 XXXXXXXXXX",

        "state": "--",

        "city": "--",

        "address": "--"
    }


    return jsonify({

        "success": True,

        "patient": patient

    })


# ============================================================
# 9. MEDICAL REPORT UPLOAD API
# ============================================================

# POST /api/upload-report
#
# This API receives a medical report file.
#
# Currently we only receive the file and return
# its filename.
#
# Later we can implement proper file storage
# and database integration.


@app.route("/api/upload-report", methods=["POST"])
def upload_report():

    # Check whether file was uploaded

    if "report" not in request.files:

        return jsonify({

            "success": False,

            "message": "No report uploaded"

        }), 400


    # Get uploaded file

    report = request.files["report"]


    # Check filename

    if report.filename == "":

        return jsonify({

            "success": False,

            "message": "No file selected"

        }), 400


    # Print filename for testing

    print("================================")
    print("MEDICAL REPORT RECEIVED")
    print("Filename:", report.filename)
    print("================================")


    # Temporary response

    return jsonify({

        "success": True,

        "message": "Report uploaded successfully",

        "filename": report.filename

    })


# ============================================================
# 10. HEALTH CHECK API
# ============================================================

# This API checks whether Flask backend is running.
#
# Open:
#
# http://127.0.0.1:5000/api/health
#
# Expected response:
#
# {
#     "success": true,
#     "message": "MediQR backend is running"
# }


@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({

        "success": True,

        "message": "MediQR backend is running"

    })


# ============================================================
# 11. START FLASK SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )