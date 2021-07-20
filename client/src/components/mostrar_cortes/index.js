import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('MostrarCortes', {
    $validates: 1,
	data () {
		return {
            escala_lados_iguales:0.017,
            x_screen: 1,
            escala: 0.9,
            escale: 0.9,
            escala_desktop: 0.55,
            escala_desktop_large: 0.65,
            escala_mobile_large: 1.17,
            escala_mobile: 1,
            slide: 'style',
            ancho_acumulado: 5,
            alto_acumulado : 5,
            alto_fila : 5,
            restantes: false,
            porcentaje_op: 0,
            fila : [],
            bloques : [],
            bloques_areglo : [],
            panels :[],
            unidad:'',
            ancho_plancha_base:0,
            alto_plancha_base:0,
            panelWidth:0,
            grosorLinea: 0,
            panelHeight: 0,
            pagerIndex : 0,
            parametros_tabla:{
                navigationActive: false,
                filter: '',
                selected: [],
                tittle: 'Cortes',
                pagination: {
                    page: 1,    
                    rowsPerPage: 5 // 0 means all rows    
                },
                columns: [
                  { name: 'ancho', align: 'center', label: 'Ancho', field: 'ancho', sortable: true },
                  { name: 'alto', align: 'center', label: 'Alto', field: 'alto', sortable: true },
                  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad' , sortable: true},
                //   { name: 'area_corte', align: 'center', label: 'Volumen en plancha', field: 'area_corte' , sortable: true},
                ],
                data: [
                ],
            },
        }
    },
    props: [
        'parametros',
        'funciones',
        'btn_guardar'
    ],
	computed: {

	},
	methods: {
        async dibujar_cortes(){
            this.ancho_acumulado = 5
            this.alto_acumulado = 5
            const canvas = document.getElementById("grafico");
            canvas.width = this.parametros.ancho_plancha / this.x_screen;
            canvas.height = this.parametros.alto_plancha / this.x_screen;

            // Del canvas, obtener el contexto para poder dibujar
            const contexto = canvas.getContext("2d");
            contexto.lineWidth = this.parametros.grosor_sierra;
            // Color de línea
            contexto.strokeStyle = "#00b2ff";
            contexto.textAlign = "center"
            // Color de relleno
            contexto.fillStyle = "#343640 ";
            contexto.strokeStyle="#00b2ff"; //color de contorno azul
            contexto.scale(0.5, 0.5);
            // contexto.strokeStyle = "#fff";
            var cortes =[]
            if (typeof this.parametros.parametros === 'string'){
                cortes = JSON.parse(this.parametros.parametros)
            }
            else{
                cortes = this.parametros.parametros
            }
            for (let index = 0; index < cortes.length; index++) {
                const cantidad = cortes[index].cantidad;
                const alto = cortes[index].alto_corte_base / this.x_screen;
                const ancho = cortes[index].ancho_corte_base / this.x_screen;
                console.log('cortes[index]',cortes[index])

                const ancho_corte =  cortes[index].ancho
                const alto_corte = cortes[index].alto
                const ancho_plancha =  cortes[index].ancho_plancha
                const alto_plancha =  cortes[index].alto_plancha
                const alto_texto = alto / 1.7;
                const ancho_texto = ancho / 2;
                const ancho_anterior = 5
                const alto_anterior = 5
                if(ancho < alto){
                    contexto.font = ancho_corte + "px Arial";
                }
                else{
                    contexto.font = alto_corte + "px Arial";
                }
                
                this.total_cortes = cortes[index].total_cortes
                for (let j = 0; j < cantidad; j++) {
                    // debugger
                    console.log('j',j)
                    console.log('ancho_acumulado',this.ancho_acumulado)
                    console.log('alto_acumulado',this.alto_acumulado)
                    console.log('alto',alto)
                    console.log('ancho',ancho)
                    console.log('alto_fila',this.alto_fila)
                    //pregunto si el ancho acumulado en la fila + el ancho de la pieza es mayor al ancho de la plancha
                    if((this.ancho_acumulado + ancho) > (ancho_plancha / this.x_screen) ){
                        // debugger
                        //si es menor, agrego la pieza al costado de la anterior en la misma fila
                        var obj = {
                            fila : j,
                            ancho: this.ancho_acumulado,
                            alto: this.alto_acumulado
                        }
                        this.fila.push(obj)
                        this.alto_acumulado = this.alto_acumulado + this.alto_fila
                        this.alto_fila = alto 
                        if (this.alto_acumulado > (alto_plancha / this.x_screen)){
                            // debugger
                            for (let i = 0; i < this.fila.length ; i++) {
                                var ancho_fila_acumulado = this.fila[i].ancho
                                var alto_fila_acumulado = this.fila[i].alto
                                if((ancho_fila_acumulado + ancho) < (ancho_plancha / this.x_screen) ){
                                    if((alto_fila_acumulado + alto) < (alto_plancha / this.x_screen) ){
                                        contexto.fillRect(ancho_fila_acumulado, alto_fila_acumulado, ancho, alto);
                                        contexto.strokeRect(ancho_fila_acumulado, alto_fila_acumulado, ancho, alto);
                                        contexto.lineWidth = 1;
                                        contexto.fillStyle = "#fff ";
                                        contexto.fillText(ancho_corte +"X"+ alto_corte,ancho_fila_acumulado + ancho_texto, alto_fila_acumulado + alto_texto);
                                        contexto.fillStyle = "#343640 ";
                                        ancho_fila_acumulado = ancho_fila_acumulado + ancho
                                        alto_fila_acumulado = alto_fila_acumulado + alto
                                        if((i + 1) < this.fila.length ){
                                            if (alto_fila_acumulado > this.fila[i+1].alto)
                                            {
                                                var obj = {
                                                    fila : i+1,
                                                    ancho: this.fila[i].ancho,
                                                    alto: alto_fila_acumulado
                                                }
                                                this.fila[i+1] = obj
                                            }
                                            else{
                                                var obj = {
                                                    fila : i+1,
                                                    ancho: this.fila[i].ancho,
                                                    alto: this.fila[i].alto
                                                }
                                                this.fila[i+1] = obj
                                            }
                                        }
                                        if(this.fila[i].alto < alto){
                                            var obj = {
                                                fila : i,
                                                ancho: ancho_fila_acumulado,
                                                alto: alto_fila_acumulado
                                            }
                                            this.fila[i] = obj
                                        }
                                        else{
                                            var obj = {
                                                fila : i,
                                                ancho: ancho_fila_acumulado,
                                                alto: this.fila[i].alto
                                            }
                                            this.fila[i] = obj
                                        }
                                        break;
                                    }
                                    else{
                                        continue;
                                    }

                                }
                                else{
                                    continue;
                                }
                            }
                        }
                        else{
                            this.ancho_acumulado = 5
                            contexto.fillRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                            contexto.strokeRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                            
                        }
                        contexto.lineWidth = 1;
                        contexto.fillStyle = "#fff ";
                        contexto.fillText(ancho_corte +"X"+ alto_corte,this.ancho_acumulado + ancho_texto, this.alto_acumulado + alto_texto);
                        contexto.lineWidth = this.parametros.grosor_sierra;
                        contexto.fillStyle = "#343640 ";
                        this.ancho_acumulado = this.ancho_acumulado + ancho

                    }
                    else{
                        // debugger
                        if(alto <= this.alto_fila){
                            contexto.fillRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                            contexto.strokeRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                            // this.alto_fila = alto 
                            //guradar espacio disponible
                        }
                        else{
                            if(ancho <= this.alto_fila){
                                var ancho_antiguo = ancho
                                ancho = alto
                                alto = ancho_antiguo
                                if((this.ancho_acumulado + ancho) > (ancho_plancha / this.x_screen) ){
                                    this.alto_acumulado = this.alto_acumulado + this.alto_fila
                                    this.alto_fila = alto 
                                    this.ancho_acumulado = 5
                                    contexto.strokeStyle = "#fff";
                                    contexto.fillRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                                    contexto.strokeRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                                    // this.ancho_acumulado = this.ancho_acumulado + ancho
                                }
                                else{
                                    contexto.fillRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                                    contexto.strokeRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                                }
                            }
                            else{
                                this.alto_acumulado = this.alto_acumulado + this.alto_fila
                                this.alto_fila = alto 
                                this.ancho_acumulado = 5
                                contexto.strokeStyle = "#fff";
                                contexto.fillRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                                contexto.strokeRect(this.ancho_acumulado, this.alto_acumulado, ancho, alto);
                                // this.ancho_acumulado = this.ancho_acumulado + ancho
                            }
                        }
                        contexto.lineWidth = 1;
                        contexto.fillStyle = "#fff ";
                        contexto.fillText(ancho_corte +"X"+ alto_corte,this.ancho_acumulado + ancho_texto, this.alto_acumulado + alto_texto);
                        contexto.lineWidth = this.parametros.grosor_sierra;
                        contexto.fillStyle = "#343640 ";
                        
                        this.ancho_acumulado = this.ancho_acumulado + ancho
                    }
                }
                if(this.restantes){

                }
            }
            contexto.stroke();
        },
        async dibujar(){
            // debugger
            this.bloques_areglo = [];
            this.organizar()
            this.agregarPartes();
            console.log('bloques_areglo', this.bloques_areglo)
            // debugger
            this.optimizar(this.bloques_areglo);
            this.report(this.bloques_areglo,this.panelWidth,this.panelHeight)
            for (var i = 0; i < this.panels.length; i++) {
              this.panels[i].push(1);
            }
      
            this.duplicarPanel(this.panels);
            this.visualizar(this.panels);
            $("#pagerCenter").html(1);
            $("#canvas0").show();
            
        },
        duplicarPanel (panels) {

            for (var i = 0; i < panels.length - 1; i++) {
                var panelQuantity = 1;
                for (var t = i + 1; t < panels.length; t++) {
                    if (this.compareBlocks(panels[i], panels[t])) {
                        panelQuantity = panelQuantity + 1;
                        panels[i][panels[i].length - 1] = panelQuantity;
                    }
                }
                panels.splice(i + 1, panelQuantity - 1);
            }
        },
        report(blocks, w, h) {
            var fit = 0, nofit = [], block, n, len = blocks.length;
            for (n = 0 ; n < len ; n++) {
                block = blocks[n];
                if (block.fit)
                    fit = fit + block.area;
                else
                    nofit.push("" + block.w + "x" + block.h);
            }
            this.porcentaje_op = Math.round(100 * fit / (w * h))
            console.log(this.porcentaje_op)
            console.table(nofit)
        },
        compareBlocks(array1, array2) {

            if (array1.length != array2.length)
                return false;

            for (var i = array1.length - 1; i >= 0; i--) {
                if (array1[i].h != array2[i].h) return false;
                if (array1[i].w != array2[i].w) return false;
                if (array1[i].fitW != array2[i].fitW) return false;
                if (array1[i].fitY != array2[i].fitY) return false;
            }
            return true;
        },
        visualizar(panelArray) {
            var ancho_panel_mob = (this.panelWidth * this.escala)  / 1.07
            var alto_panel_mob = (this.panelHeight * this.escala) / 1.07
            var ancho_panel = (this.panelWidth * this.escala)
            var alto_panel = (this.panelHeight * this.escala)
            var top = (this.panelHeight * this.escala) / 2 ;
            var left = (this.panelWidth * this.escala) / 2 ;
            if(this.$q.platform.is.desktop){
                $("#panelDiv").width(ancho_panel);
                $("#panelDiv").height(alto_panel);
                var lineaAtras = "<div class='linea_abajo'>&nbsp;</div>";
                var medida = "<div class='leyenda_abajo' style='top:" + top +"px;'>"+ this.parametros.alto_plancha +"</div>";
                $("#medida_alto").append(lineaAtras);
                $("#medida_alto").append(medida);
                var lineaAtras = "<div class='linea'>&nbsp;</div>";
                var medida = "<div class='leyenda' style='left:" + left +"px;'>"+ this.parametros.ancho_plancha +"</div>";
                $("#panelDiv").append(lineaAtras);
                $("#panelDiv").append(medida);
            }
            else{
                $("#panelDiv").width(ancho_panel_mob);
                $("#panelDiv").height(alto_panel_mob);
                var lineaAtras = "<div class='linea_abajo_mob'>&nbsp;</div>";
                var medida = "<div class='leyenda_abajo_mobile' style='margin-top:" + top +"px;'>"+ this.parametros.alto_plancha +"</div>";
                $("#medida_alto").append(lineaAtras);
                $("#medida_alto").append(medida);
                var lineaAtras = "<div class='linea_mob'>&nbsp;</div>";
                var medida = "<div class='leyenda_mobile' style='left:" + left +"px;'>"+ this.parametros.ancho_plancha +"</div>";
                $("#panelDiv").append(lineaAtras);
                $("#panelDiv").append(medida);
            }



            
            // $("#panelDiv").append(lineaVerAtras);

            // $("#panelDiv").append(lineaVerAdelante);
            var canvas = null;
            for (var i = 0; i < panelArray.length; i++) {
                var canvasId = "canvas" + i;
                var createCanvas = "<canvas id='" + canvasId + "' width ='" + this.fitDisplay(this.panelWidth) + "' height ='" + this.fitDisplay(this.panelHeight) + "'></canvas>";
                $("#panelDiv").append(createCanvas);

                canvas = document.getElementById(canvasId);
                this.dibujarContorno(canvas,this.panelWidth,this.panelHeight);
            
                var panelQuantity = this.panels[i][this.panels[i].length - 1];
                // create a rectangle for each of the parts in this panel
                for (var t = 0; t < panelArray[i].length; t++) {
                    // console.log('panelArray[i]',panelArray[i])
                    var block = panelArray[i][t];
                    this.dibujarPiezas(canvas , block.fitX, block.fitY, block.w, block.h, block.alto, block.ancho);
                }
            
                $(canvas).data("panelQty", panelQuantity);
            }

            $("canvas").hide();
            $("canvas").eq(this.pagerIndex).show();
        },
        dibujarContorno(canvas, width, height) {
            if (canvas.getContext) {
                var contexto = canvas.getContext("2d");
                this.setpixelated(contexto)
                contexto.lineWidth = 10;
                // Color de línea
                // contexto.strokeStyle = "#00b2ff";
                contexto.textAlign = "center"
                // Color de relleno
                contexto.fillStyle = "#20222a ";
                contexto.strokeStyle="#00b2ff"; //color de contorno azul
                if(this.$q.platform.is.desktop){
                    contexto.scale(this.escala, this.escala);
                }
                else{
                    contexto.scale(this.escala, this.escala);
                }
                contexto.fillRect(0, 0, width, height);
                
                contexto.strokeRect(0, 0, width, height);
                
            }
        },
        dibujarPiezas(canvas, x, y, width, height, alto, ancho) {
            if (canvas.getContext) {
                const alto_texto = y + height / 1.7;
                const ancho_texto = x + width / 2;
                var contexto = canvas.getContext("2d");
                this.setpixelated(contexto)
                contexto.lineWidth = this.parametros.grosor_sierra;
                // Color de línea
                contexto.strokeStyle = "#00b2ff";
                contexto.textAlign = "center"
                // Color de relleno
                contexto.fillStyle = "#343640 ";
                contexto.strokeStyle="#00b2ff"; //color de contorno azul
                // console.log('x',x)
                // console.log('y',y)
                // console.log('width',width)
                // console.log('height',height)
                contexto.strokeRect(x, y, width, height);
                contexto.strokeRect(x, y, width, height);
                // contexto.lineWidth = 1;
                contexto.fillStyle = "#fff ";
                if(alto != 0){
                    if(ancho < alto){
                            contexto.font = (ancho * 2.5) + "px Arial";
                    }
                    else{
                        if(ancho == alto){
                            contexto.font = (alto * 2) + "px Arial";
                        }
                        else{
                            contexto.font = (alto * 2.5) + "px Arial";
                        }
                    }
                    contexto.fillText(alto +"X"+ ancho,  ancho_texto, alto_texto);
                }
                   
                contexto.lineWidth = this.parametros.grosor_sierra;
                contexto.fillStyle = "#343640 ";
                // contexto.scale(0.5, 0.5);
            }
        },
        setpixelated(context){
            // context['imageSmoothingEnabled'] = false;       /* standard */
            // context['mozImageSmoothingEnabled'] = false;    /* Firefox */
            // context['oImageSmoothingEnabled'] = false;      /* Opera */
            // context['webkitImageSmoothingEnabled'] = false; /* Safari */
            // context['msImageSmoothingEnabled'] = false;     /* IE */
        },
        async optimizar(bloques){

            var removeBlockArray = [];
            var blockArray = [];
        
            // create a bin packing panel
            // fit the parts in the array into the panel
            var ancho_plancha = this.ancho_plancha_base
            var alto_plancha = this.alto_plancha_base
            if(alto_plancha > ancho_plancha){
                this.panelWidth = (alto_plancha) // this.x_screen) -5;
                this.panelHeight = (ancho_plancha) // this.x_screen) -5;
            }
            else{
                this.panelWidth = (ancho_plancha) // this.x_screen) -5;
                this.panelHeight = (alto_plancha) // this.x_screen) -5;
            }

            // this.panelWidth = ancho_plancha / this.x_screen;
            // this.panelHeight = alto_plancha / this.x_screen;
            var packer = new Packer(this.fitDisplay(this.panelWidth), this.fitDisplay(this.panelHeight));

            packer.fit(bloques);
        
            // decide if the part fits the panel
            // add to appropriate array
            for (var i = 0; i < bloques.length; i++) {
                var block = bloques[i];
                if (block.fit) {
                    removeBlockArray.push(i);
                    blockArray.push({
                        fitX: block.fit.x,
                        fitY: block.fit.y,
                        w: block.w,
                        h: block.h,
                        alto: block.alto,
                        ancho: block.ancho
                    });
                }
            }
            // console.log('blockArray',blockArray)
            // add this panel of parts to the array of panels
            this.panels.push(blockArray);
        
            // remove the fitted parts from the pool of parts to be fit
            for (var i = removeBlockArray.length - 1; i >= 0; i--) {
                bloques.splice(removeBlockArray[i], 1);
            }
        
            // if parts are still to be fit
            // call this optimize function again
            if (bloques.length > 0) {
                this.optimizar(bloques);
            }
        },
        async organizar(){
            var cortes =[]
            if (typeof this.parametros.parametros === 'string'){
                cortes = JSON.parse(this.parametros.parametros)
            }
            else{
                cortes = this.parametros.parametros
            }
            for (let index = 0; index < cortes.length; index++) {
                // this.ancho_plancha_base = cortes[index].ancho_plancha_base
                // this.alto_plancha_base = cortes[index].alto_plancha_base
                const cantidad = cortes[index].cantidad;
                const alto = cortes[index].alto_corte_base // this.x_screen;
                const ancho = cortes[index].ancho_corte_base // this.x_screen;
                const alto_corte = cortes[index].alto
                const ancho_corte = cortes[index].ancho
                this.bloques.push({
                    w: Number(ancho),
                    h: Number(alto),
                    qty: Number(cantidad),
                    alto: Number(alto_corte),
                    ancho: Number(ancho_corte),
                })
            }
            // console.log('bloques',this.bloques)
            // this.dibujar(this.bloques)
        },
        async capturar_dimensiones(){
            var cortes =[]
            if (typeof this.parametros.parametros === 'string'){
                cortes = JSON.parse(this.parametros.parametros)
            }
            else{
                cortes = this.parametros.parametros
            }
            for (let index = 0; index < cortes.length; index++) {
                this.ancho_plancha_base = cortes[index].ancho_plancha_base
                this.alto_plancha_base = cortes[index].alto_plancha_base
                this.unidad = cortes[index].unidad
            }
        },
        async agregarPartes(){
            // debugger
            for (var i = 0; i < this.bloques.length; i++) {
                for (var t = 0; t < this.bloques[i].qty; t++) {
                    var objeto = {
                        w: this.bloques[i].w,
                        h: this.bloques[i].h,
                        alto: this.bloques[i].alto,
                        ancho: this.bloques[i].ancho,
                        area: this.bloques[i].alto * this.bloques[i].ancho
                    }
                    // console.table(objeto)
                    this.bloques_areglo.push(objeto);
                }
            }
            // ordena del mas alto al más bajo
            // ordena por el ancho
            // var self = this
            this.bloques_areglo.sort(((a, b) => {
                if(a.h > a.w)
                {
                    b.h - a.h
                }
                else{
                    b.w - a.w
                }
                }))
            // console.table(this.bloques_areglo)
            // this.bloques_areglo.sort(a,b) { 
            //     return self.msort(a, b, ['max', 'min', 'h', 'w']
            //     ); 
            // })
            // this.bloques_areglo.sort(a, b) {
            //     return (b.h < a.h);
            // });
            // this.now(this.bloques_areglo)
            // this.bloques_areglo.sort(a, b) {
            //     return (a.w < b.h);
            // });
        },
        fitDisplay(item) {
            return item
            // return item *= this.x_screen;
        },
        async cargar_x_screen(){
            var panel = document.getElementById("panel");
            var ancho_panel = panel.clientWidth
            var alto_panel = panel.clientHeight
            // console.log('ancho panel',panel.clientWidth);
            // console.log('alto panel',panel.clientHeight);
            var ancho_plancha = this.ancho_plancha_base
            var alto_plancha = this.ancho_plancha_base
            // console.log('ancho_plancha',ancho_plancha);
            // console.log('alto_plancha',alto_plancha);
            //escala

            if(alto_plancha === ancho_plancha){
                this.escala = this.escala - this.escala_lados_iguales
            }
            if (ancho_plancha > ancho_panel){
                this.x_screen = ancho_plancha / ancho_panel
                this.x_screen = this.x_screen / this.escale
            }

            // console.log('ancho_plancha_pantalla',ancho_plancha /this.x_screen);
            // console.log('alto_plancha_pantalla',alto_plancha / this.x_screen);
            // console.log('x_screen', this.x_screen)
        },
        ir_atras(){
            if (this.pagerIndex > 0) {
                var canvas = "#canvas"+ this.pagerIndex
                $(canvas).hide();
                this.pagerIndex--;
                canvas = "#canvas"+ this.pagerIndex
                $(canvas).show();
            }
        },
        ir_adelante(){
            if (this.pagerIndex < this.panels.length - 1) {
                var canvas = "#canvas"+ this.pagerIndex
                $(canvas).hide();
                this.pagerIndex++;
                canvas = "#canvas"+ this.pagerIndex
                $(canvas).show();
            }
        },
        mostrar_tabla(){
            $("#btn_der").hide();
            $("#btn_iz").show();
            $("#datos_corte").hide();
            $("#tabla_cortes").show();
        },
        mostrar_datos(){
            $("#btn_iz").hide();
            $("#btn_der").show();
            $("#tabla_cortes").hide();
            $("#datos_corte").show();
        },
        async cargar_escala(){
            console.log(this.$q.screen.width)
            if(this.$q.platform.is.desktop){
                if  (this.alto_plancha_base > this.ancho_plancha_base){
                    this.escala = (this.$q.screen.width / this.alto_plancha_base) * this.escala_desktop
                }
                else{
                    if(this.alto_plancha_base < (this.ancho_plancha_base / 2))  {
                        this.escala = (this.$q.screen.width / this.ancho_plancha_base) * this.escala_desktop_large
                    }
                    else{
                        this.escala = (this.$q.screen.width / this.ancho_plancha_base) * this.escala_desktop
                    }
                    
                }
                // this.escala = (this.$q.screen.width * 0.00022)
            }
            else{
                if  (this.alto_plancha_base > this.ancho_plancha_base){
                    this.escala = (this.$q.screen.width / this.alto_plancha_base) * this.escala_mobile
                }
                else{
                    if(this.alto_plancha_base < (this.ancho_plancha_base / 2))  {
                        this.escala = (this.$q.screen.width / this.ancho_plancha_base) * this.escala_mobile_large
                    }
                    else{
                        this.escala = (this.$q.screen.width / this.ancho_plancha_base) * this.escala_mobile
                    }
                    
                }
                // this.escala = (this.$q.screen.width * 0.00038)
                // this.escala = (this.$q.screen.width * 0.00038)
            }
            
            // if(this.$q.screen.width > 1919){
            //     this.escala = (this.$q.screen.width * 0.0004)
            // }
            // else if(this.$q.screen.width < 1919 && this.$q.screen.width > 1439){
            //     this.escala = (this.$q.screen.width * 0.0004)
            // }
            // else if(this.$q.screen.width < 1439 && this.$q.screen.width > 1023){
            //     this.escala = (this.$q.screen.width * 0.0004)
            // }
            // else{
            //     this.escala = (this.$q.screen.width * 0.0004)
            // }
            console.log('this.escala',this.escala)
        },
	},
	components: {
	},

	created () {
        if (typeof this.parametros.parametros === 'string'){
            this.parametros_tabla.data = JSON.parse(this.parametros.parametros)
        }
        else{
            this.parametros_tabla.data = this.parametros.parametros
        }
        console.log('parametros' ,this.parametros_tabla.data)
        $("#btn_iz").hide();
        // console.log(this.funciones)
	},
	mounted () {
        this.$q.loading.show()
        $("#btn_iz").hide();
        $("#tabla_cortes").hide();
        this.capturar_dimensiones()
        this.cargar_escala()
        this.cargar_x_screen()
        this.dibujar()
        this.$q.loading.hide()
        // this.dibujar_cortes()
	},
	updated () {
	},
    watch: {
        "$q.screen.width"() {
            // this.capturar_dimensiones()
            // this.cargar_x_screen()
            // this.dibujar()
        }
    }

})
