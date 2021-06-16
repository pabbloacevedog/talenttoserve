/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Card, CardHeader, CardBody, Carousel,
	CarouselItem,
	CarouselIndicators, } from "reactstrap";
// core components
const items = [
	{
		src: require("assets/img/julie.jpg").default,
		altText: "Patricia Borges da Gama",
		caption: `Administrador Hotelero/ Diplomado en Gestión Hotelera y Turismo
			32 Años en Hotelería/ Asume cargos a nivel gerencial en Área de
			Operaciones en Chile, Portugal y Brasil. Participación en 3 aperturas
			de Hoteles y en 4 de preaperturas y aperturas como asesora.
			Docente durante 8 años en Asignaturas de Hotelería en 4
			Universidades en Chile y México y 7 años como entrenadora de
			varias cadenas hoteleras.
			Fundadora y administradora de Service to Serve Consulting, y de
			Talent to Serve (Portal Hotelero)
			Hotel Ritz Carlton Santiago, Chile y en Lisboa, Portugal (Luxury),
			Grand Hyatt Santiago, Chile (Luxury), Hotel Renaissance Santiago,
			Chile (Upper Upscale), Hoteles Park Plaza Santiago, Chile
			(Upscale),Hoteis Transamerica, Brasil (Upscale) Hotel Maksoud,
			Brasil(Upscale)`,
	},
	{
		src: require("assets/img/julie.jpg").default,
		altText: "Velia Orozco del Valle",
		caption: `Licenciada en Ciencias de la Comunicación / MBA Master en
		administración de negocios
		Mas de 22 Años de experiencia profesional en comunicación y
		Hotelería/ Asume cargos a nivel gerencial en Área de ventas y mkg
		en Chile dirigiendo equipos comerciales.
		Desarrollo de mercados México, Argentina, Brasil, Perú y Colombia.
		Participación de la apertura de Ritz Carlton Santiago y de la
		operación comercial en la fusión entre Marriott International y
		Starwood hotels; dentro de la propiedad W Santiago.
		Experiencia docente universitaria y magíster,Performance life and
		balance coach, coach ejecutivo, Asesora de Imagen
		Boards - 14 años como Directora en la Cámara Chilena Mexicana y
		Presidenta de comité de networking y desarrollo de nuevos negocios
		y como Directora de Santiago convention Bureau
		`,
	},
	{
		src: require("assets/img/julie.jpg").default,
		altText: "Natalia Ortiz",
		caption: `Administradora de Empresas Turísticas y Hoteleras
		17 años de experiencia., comenzó su carrera en el área operativa
		para luego continuar en el área de Ventas y Mercadeo. Ha trabajado
		en cadenas como Marriott y Hilton liderando equipos comerciales.
		Ha participado en 6 aperturas de hoteles tanto en Colombia como
		en Chile, desde marcas de servicios limitados como Hampton hasta
		propiedades de lujo como Conrad.
		Tiene conocimiento en creación de presupuestos, desarrollo y
		manejo de portafolio de clientes, reportes y presentaciones a
		superiores, planeación estratégica de mercadeo, cumplimiento de
		metas, entrenamiento y creación de material de ventas.
		Mariott Bogotá, JW Marriott Bogotá, Hampton by Hilton
		Barranquilla y Cartagena, Renaissance Santiago, Conrad
		Cartagena, Hilton Garden Inn Barranquilla y Hilton Garden Inn
		Santa Marta.`,
	},
	{
		src: require("assets/img/julie.jpg").default,
		altText: "Emilio Bissoni",
		caption: `Administrador de Empresas
		30 años en Hotelería/.Ha gestionado restaurantes y hoteles de
		lujo, de servicio completo y de servicio limitado, en cinco cadenas
		nternacionales. Como Gerente General o Gerente Corporativo de
		Operaciones, ha liderado grupos de trabajo en Argentina, Brasil,
		Chile, Colombia, Perú, Uruguay y USA.
		Participó en el análisis de viabilidad, diseño conceptual, definición
		de la oferta, desarrollo del proyecto, puesta en marcha y apertura
		de hoteles en Buenos Aires, Santiago, Río de Janeiro, Florianópolis,
		Miami, Lima y Bogotá, además de haber liderado el cambio de
		bandera de hoteles en Argentina y Colombia.
		Ha trabajado en todas las áreas operativas de un hotel hasta
		alcanzar la posición de Gerente General en algunas de las
		cadenas y hoteles más relevantes de América Latina`,
		},
		{
			src: require("assets/img/julie.jpg").default,
			altText: "Roberto Castillo",
			caption: `Contador Auditor
			Mas de 30 años de experiencia en Hoteles de cadenas internacionales
			y nacionales.
			Aperturas, Puesta en Marcha, Implementación, Contabilidad.
			Control de gestión y reportes segun USALI.
			Cierres contables, balances, estado de resultados, emisión informes
			de cierre, cálculo de variaciones, cuentas por pagar, cobrar,
			proveedores, auditoría de ingresos, tesorería, Budget, Gestión
			Operacional.
			Hotel Sheraton Santiago ( Luxury ), Hotel Ritz Carlton Santiago
			(Luxury), Hotel The Singular ( Luxury) , Hotel Noi ( Upper Upscale),
			Hotel Hilton Garden Inn( Upscale)`,
		},
		{
			src: require("assets/img/julie.jpg").default,
			altText: "Katherine Rodriguez",
			caption: `Administradora de Empresas mencion Ventas y Marketing
			Posee una experiencia de 20 años en la hotelería, trabajando en
			las mejores cadenas internacionales del país
			Inició su carrera en Sheraton Santiago Hotel by Starwood.
			obteniendo cargos a nivel gerencial en The Ritz Carlton hotel by
			Marriott - Grand Hyatt Santiago - Renaissance Santiago Hotel by
			Marriott.
			Su experiencia abarca las áreas de Recepción, Pisos ejecutivos,
			gerencia nocturna, Capacitación, Ventas y Marketing para
			Alimentos y bebidas, Spa and fitness center, Concierge y como
			manager on duty.
			`,
		},
	];
	let indice;
function Nosotros() {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [animating, setAnimating] = React.useState(false);
	const onExiting = () => {
		setAnimating(true);
	};
	const onExited = () => {
		setAnimating(false);
	};
	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		indice = nextIndex + 1
		setActiveIndex(nextIndex);
	};
	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		indice = nextIndex + 1
		setActiveIndex(nextIndex);
	};
	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};
	return (
		<>
			<div className="page-header" id="nosotros-section">
				<div className="section-images" className="bg-black">
					<Container >
						<h1 className="pt-4">Sobre Nosotros</h1>
						<p>Nuestro equipo está constituido por profesionales
						multidiciplinarios con más de 20 años de
						trayectoria en hotelería de cadenas internacionales
						y nacionales de cinco estrellas y en la docencia.
						Desde nuestros inicios, asesoramos a empresas
						hoteleras y a empresarios del servicio en la
						implementación de las nuevas tecnologías,
						administración, comercialización, gestión de
						hoteles, calidad y servicio de excelencia en etapa de
						pre-apertura y en operación.
						Ofrecemos varios cursos de inducción y
						capacitación acreditados por la Universidad Finis
						Terrae (Santiago, Chile), logrando un alto nivel de
						servicio con el fin de generar ventajas competitivas
						en un mercado actual de alta exigencia.
						</p>
							<Carousel
							activeIndex={activeIndex}
							next={next}
							previous={previous}
						>
							<CarouselIndicators
							items={items}
							activeIndex={activeIndex}
							onClickHandler={goToIndex}
							/>
							{items.map((item,index) => {
                                let indice = index + 1
							return (
								<CarouselItem
								onExiting={onExiting}
								onExited={onExited}
								key={item.src}
								>
									<Row className="pt-5">
							<Col sm="6">
							<Card className="bg-primary">
								<CardHeader className="pt-4 ">
									<img
									src={item.src} 
									className="rounded-circle avatar-nosotros"
									></img>
									<h4 className="category">{item.altText}</h4>
								</CardHeader>
								<CardBody>
									<p>{item.caption}</p>
								</CardBody>
								</Card>
							</Col>
							<Col sm="6">
							    <Card className="bg-primary">
								<CardHeader className="pt-4 ">
									<img
									src={item.src} 
									className="rounded-circle avatar-nosotros"
									></img>
									<h4 className="category">{item.altText}</h4>
								</CardHeader>
								<CardBody>
									<p>{item.caption}</p>
								</CardBody>
								</Card>
							</Col>
							</Row>
								<img src={item.src} alt={item.altText} />
								<div className="carousel-caption d-none d-md-block">
									<h5>{item.caption}</h5>
								</div>
								</CarouselItem>
							);
							})}
							<a
							className="carousel-control-prev"
							data-slide="prev"
							href="#pablo"
							onClick={(e) => {
								e.preventDefault();
								previous();
							}}
							role="button"
							>
							<i className="now-ui-icons arrows-1_minimal-left"></i>
							</a>
							<a
							className="carousel-control-next"
							data-slide="next"
							href="#pablo"
							onClick={(e) => {
								e.preventDefault();
								next();
							}}
							role="button"
							>
							<i className="now-ui-icons arrows-1_minimal-right"></i>
							</a>
						</Carousel>
					</Container>
				</div>
			</div>
		</>
	);
}

export default Nosotros;
