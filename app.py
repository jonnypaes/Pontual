import os
import json
from flask import Flask, request, jsonify, render_template
from flaskext.mysql import MySQL
from datetime import datetime, timedelta
from models.queries import MyQueries


app = Flask(__name__, static_url_path='', static_folder='views/static', template_folder='views')
   
mysql = MySQL(app)

# MySQL configurations
app.config['MYSQL_DATABASE_HOST'] = 'db'
app.config['MYSQL_DATABASE_DB'] = 'PONTUAL'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'mudar123'
app.config['MYSQL_DATABASE_PORT'] = 3306
mysql.init_app(app)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/funcionario', methods=['GET', 'POST'])
def showFuncionario():
    if request.method == 'POST':
        try:
            data = request.get_json()
            toggle_status = data.get('toggle')
            id_empresa = 1
            id_funcionario = 1
            id_evento = 0
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            descricao = 'TESTE2'
            
            con = mysql.connect()
            cur = con.cursor()
            
            if toggle_status:
                toggle_status = 1
            else:
                toggle_status = 0
            
            values = (id_empresa, id_funcionario, id_evento, latitude, longitude, descricao)
            cur.execute(MyQueries.INSERT_APONTAMENTOS, values)
          
            con.commit()
            cur.close()
            con.close()

            return jsonify({"message": "Data updated successfully"})
        
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    try:
        cur.execute(MyQueries.SELECT_FUNCIONARIO)
        status_data = cur.fetchall()
        cur.close()
    except Exception as e:
        print(f"Error fetching data from the database: {str(e)}")
        status_data = []
    return render_template('funcionario.html', status_data=status_data)

@app.route('/administrador', methods=['POST', 'GET'])
def showAdministrador():
    con = None
    cur = None
    
    try:
        con = mysql.connect()
        cur = con.cursor()
        cur.execute(MyQueries.SELECT_FUNCIONARIO)
        data = cur.fetchall()
        
        """
        print(data[0])
        for x in range(len(data)):
            print(data[x])
            
        """
        
        result = []
        for row in data:
            result.append({
                'EMPRESA_NOME': row[0],  
                'FUNCIONARIO_NOME': row[1],
                'CONTADOR': row[2],
                'ESTADO': row[3],
                'DATA_APONTAMENTO': row[4],
                'HORA_APONTAMENTO': row[5],
                'LATITUDE': row[6],
                'LONGITUDE': row[7],
                'DESCRICAO': row[8]
            })
        con.commit()

        if request.headers.get('Content-Type') == 'application/json':
            return jsonify(result)
        else:
            return render_template('teste.html', data=result)
    except Exception as e:
        return jsonify({'Error: ': str(e)})
    
@app.route('/login')
def showLogin():
    return render_template('login.html')
                
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

