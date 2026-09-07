import oracledb

def get_connection():
    connection = oracledb.connect(
        user="MEDIQR_USER",
        password="MediQR123",
        dsn="localhost:1521/XEPDB1"
    )
    return connection


if __name__ == "__main__":
    conn = get_connection()
    print("Oracle Database Connected Successfully!")
    conn.close()