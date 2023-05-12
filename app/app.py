'''
	Contoh Deloyment untuk Domain Data Science (DS)
	Orbit Future Academy - AI Mastery - KM Batch 3
	Tim Deployment
	2022
'''

# =[Modules dan Packages]========================

from flask import Flask,render_template,request,jsonify
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from joblib import load

# =[Variabel Global]=============================

app   = Flask(__name__, static_url_path='/static')
model = None

# =[Routing]=====================================

# [Routing untuk Halaman Utama atau Home]	
@app.route("/")
def beranda():
    return render_template('index.html')

# [Routing untuk API]	
@app.route("/api/deteksi",methods=['POST'])
def apiDeteksi():
	# Nilai default untuk variabel input atau features (X) ke model
	input_pm10 	= 38
	input_pm25  = 53
	input_so2 	= 29
	input_co  	= 6
	input_o3  	= 31
	input_no2  	= 13
	
	if request.method=='POST':
		# Set nilai untuk variabel input atau features (X) berdasarkan input dari pengguna
		input_pm10 	= float(request.form['pm10'])
		input_pm25  = float(request.form['pm25'])
		input_so2 	= float(request.form['so2'])
		input_co  	= float(request.form['co'])
		input_o3 	= float(request.form['o3'])
		input_no2  	= float(request.form['no2'])
		
		# Prediksi kelas atau spesies bunga iris berdasarkan data pengukuran yg diberikan pengguna
		df_test = pd.DataFrame(data={
			"pm10" 	: [input_pm10],
			"pm25"  : [input_pm25],
			"so2" 	: [input_so2],
			"co"  	: [input_co],
			"o3" 	: [input_o3],
			"no2"  	: [input_no2]
		})

		hasil_prediksi = model.predict(df_test[0:1])[0]

		# Set Path untuk gambar hasil prediksi
		if hasil_prediksi == 'BAIK':
			gambar_prediksi = '/static/images/baik.jpg'
		elif hasil_prediksi == 'SEDANG':
			gambar_prediksi = '/static/images/sedang.jpg'
		else:
			gambar_prediksi = '/static/images/tidak-sehat.jpg'
		
		# Return hasil prediksi dengan format JSON
		return jsonify({
			"prediksi": hasil_prediksi,
			"gambar_prediksi" : gambar_prediksi
		})

# =[Main]========================================

if __name__ == '__main__':
	
	# Load model yang telah ditraining
	model = load('model_kualitas_dt.model')

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	
	


