$(document).ready(function(){
  
  // -[Animasi Scroll]---------------------------
  
  $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  
  // -[Prediksi Model]---------------------------
  
  // Fungsi untuk memanggil API ketika tombol prediksi ditekan
  $("#prediksi_submit").click(function(e) {
    e.preventDefault();
	
	// Set data pengukuran bunga iris dari input pengguna
  var input_pm10  = $("#pm10").val(); 
	var input_pm25  = $("#pm25").val(); 
	var input_so2   = $("#so2").val(); 
	var input_co    = $("#co").val();  
	var input_o3    = $("#o3").val(); 
	var input_no2   = $("#no2").val(); 

	// Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
			  url  : "/api/deteksi",
			  type : "POST",
			  data : {
            "pm10" : input_pm10,
					  "pm25" : input_pm25,
					  "so2"  : input_so2,
					  "co"   : input_co,
					  "o3"   : input_o3,
					  "no2"  : input_no2,
			         },
			  success:function(res){
				// Ambil hasil prediksi spesies dan path gambar spesies dari API
				res_data_prediksi   = res['prediksi']
				res_gambar_prediksi = res['gambar_prediksi']
				
				// Tampilkan hasil prediksi ke halaman web
			    generate_prediksi(res_data_prediksi, res_gambar_prediksi); 
			  }
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)
    
  })
    
  // Fungsi untuk menampilkan hasil prediksi model
  function generate_prediksi(data_prediksi, image_prediksi) {
    var str="";
    str += "<h3>Hasil Prediksi </h3>";
    str += "<br>";
    str += "<img src='" + image_prediksi + "' width=\"300\" height=\"300\"></img>"
    str += "<h3>" + data_prediksi + "</h3>";
    $("#hasil_prediksi").html(str);
  }  
  
})
  
