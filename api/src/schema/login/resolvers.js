// App Imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../../models/index.js";
import config from "../../config/config.json";
import CryptoJS from "crypto-js";
import decode from "jwt-decode";
import { QueryTypes } from "sequelize";
const nodemailer = require("nodemailer");

export async function rutas(id_perfil) {
	console.log("id_perfil", id_perfil);
	let ruta = await models.sequelize.query(
		" SELECT  " +
			"     r.path, " +
			"     r.component, " +
			"     r.name, " +
			"     r.carpet, " +
			"     r.leaf, " +
			"     r.children, " +
			"     r.enabled, " +
			"     r.order_menu, " +
			"     r.icon, " +
			"     r.addmenu, " +
			"     r.addroute " +
			" FROM " +
			"     router r " +
			"         INNER JOIN " +
			"     perfil_router pr ON pr.path = r.path " +
			" WHERE " +
			"     pr.id_perfil = :id_perfil " +
			" ORDER BY r.order_menu ASC ",
		{
			replacements: { id_perfil },
			type: QueryTypes.SELECT,
		}
	);
	return ruta;
}
async function buscar_usuario(email) {
	console.log(email);
	var usuarios = await models.sequelize.query(
		"   SELECT  " +
			"      u.usuario_id,   " +
			"      u.nombre,   " +
			"      u.email,    " +
			"      pe.nombre AS perfil,    " +
			"      pe.path_default," +
			"      u.id_perfil,    " +
			"      u.telefono, " +
			"      pa.nombre AS pais,  " +
			"      u.id_pais,  " +
			"      u.nombre_empresa,   " +
			"      u.cargo,   " +
			"      u.producto_empresa, " +
			"      u.universidad,  " +
			"      u.carrera,  " +
			"      u.suscrito_mail,    " +
			"      u.estado    " +
			"   FROM    " +
			"      usuario u   " +
			"          RIGHT JOIN  " +
			"      perfil pe ON u.id_perfil = pe.id_perfil " +
			"          LEFT JOIN  " +
			"      pais pa ON u.id_pais = pa.id     " +
			"   where u.email = :email   ",
		{
			replacements: { email },
			type: QueryTypes.SELECT,
		}
	);
	// console.log(usuarios[0]);
	return usuarios[0];
}
async function sendMail(email, passphrase, nombre) {
	// console.log(`Se ha enviado la clave ${passphrase} al email ${email}.`);
	let testAccount = await nodemailer.createTestAccount();
	// let dir = __dirname.replace(`src\\schema\\login`, "");
	let logo = "../../../public/logo.png";
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	// send mail with defined transport object
	console.log(logo);
	let info = await transporter.sendMail({
		from: "forget@talenttoserve.com", // sender address
		to: email, // list of receivers
		subject: "Talent to Serve", // Subject line
		text: passphrase, // plain text body
		html: `
<html>
    <head>
		<style class="esdev-css">/* CONFIG STYLES Please do not delete and edit CSS styles below */
			/* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
			#outlook a {
				padding: 0;
			}
			.ExternalClass {
				width: 100%;
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div {
				line-height: 100%;
			}
			.es-button {
				mso-style-priority: 100 !important;
				text-decoration: none !important;
			}
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
			.es-desk-hidden {
				display: none;
				float: left;
				overflow: hidden;
				width: 0;
				max-height: 0;
				line-height: 0;
				mso-hide: all;
			}
			[data-ogsb] .es-button {
				border-width: 0 !important;
				padding: 15px 25px 15px 25px !important;
			}
			[data-ogsb] .es-button.es-button-1644622080315 {
				padding: 15px 30px !important;
			}
			/*
			END OF IMPORTANT
			*/
			s {
				text-decoration: line-through;
			}
			html,
			body {
				width: 100%;
				font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
			}
			table {
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
				border-collapse: collapse;
				border-spacing: 0px;
			}
			table td,
			html,
			body,
			.es-wrapper {
				padding: 0;
				Margin: 0;
			}
			.es-content,
			.es-header,
			.es-footer {
				table-layout: fixed !important;
				width: 100%;
			}
			img {
				display: block;
				border: 0;
				outline: none;
				text-decoration: none;
				-ms-interpolation-mode: bicubic;
			}
			table tr {
				border-collapse: collapse;
			}
			p,
			hr {
				Margin: 0;
			}
			h1,
			h2,
			h3,
			h4,
			h5 {
				Margin: 0;
				line-height: 120%;
				mso-line-height-rule: exactly;
				font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
			}
			p,
			ul li,
			ol li,
			a {
				-webkit-text-size-adjust: none;
				-ms-text-size-adjust: none;
				mso-line-height-rule: exactly;
			}
			.es-left {
				float: left;
			}
			.es-right {
				float: right;
			}
			.es-p5 {
				padding: 5px;
			}
			.es-p5t {
				padding-top: 5px;
			}
			.es-p5b {
				padding-bottom: 5px;
			}
			.es-p5l {
				padding-left: 5px;
			}
			.es-p5r {
				padding-right: 5px;
			}
			.es-p10 {
				padding: 10px;
			}
			.es-p10t {
				padding-top: 10px;
			}
			.es-p10b {
				padding-bottom: 10px;
			}
			.es-p10l {
				padding-left: 10px;
			}
			.es-p10r {
				padding-right: 10px;
			}
			.es-p15 {
				padding: 15px;
			}
			.es-p15t {
				padding-top: 15px;
			}
			.es-p15b {
				padding-bottom: 15px;
			}
			.es-p15l {
				padding-left: 15px;
			}
			.es-p15r {
				padding-right: 15px;
			}
			.es-p20 {
				padding: 20px;
			}
			.es-p20t {
				padding-top: 20px;
			}
			.es-p20b {
				padding-bottom: 20px;
			}
			.es-p20l {
				padding-left: 20px;
			}
			.es-p20r {
				padding-right: 20px;
			}
			.es-p25 {
				padding: 25px;
			}
			.es-p25t {
				padding-top: 25px;
			}
			.es-p25b {
				padding-bottom: 25px;
			}
			.es-p25l {
				padding-left: 25px;
			}
			.es-p25r {
				padding-right: 25px;
			}
			.es-p30 {
				padding: 30px;
			}
			.es-p30t {
				padding-top: 30px;
			}
			.es-p30b {
				padding-bottom: 30px;
			}
			.es-p30l {
				padding-left: 30px;
			}
			.es-p30r {
				padding-right: 30px;
			}
			.es-p35 {
				padding: 35px;
			}
			.es-p35t {
				padding-top: 35px;
			}
			.es-p35b {
				padding-bottom: 35px;
			}
			.es-p35l {
				padding-left: 35px;
			}
			.es-p35r {
				padding-right: 35px;
			}
			.es-p40 {
				padding: 40px;
			}
			.es-p40t {
				padding-top: 40px;
			}
			.es-p40b {
				padding-bottom: 40px;
			}
			.es-p40l {
				padding-left: 40px;
			}
			.es-p40r {
				padding-right: 40px;
			}
			.es-menu td {
				border: 0;
			}
			.es-menu td a img {
				display: inline-block !important;
			}
			/* END CONFIG STYLES */
			a {
				text-decoration: underline;
			}
			p,
			ul li,
			ol li {
				font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
				line-height: 150%;
			}
			ul li,
			ol li {
				Margin-bottom: 15px;
			}
			.es-menu td a {
				text-decoration: none;
				display: block;
				font-family: lato, 'helvetica neue', helvetica, arial, sans-serif;
			}
			.es-wrapper {
				width: 100%;
				height: 100%;
				background-image: ;
				background-repeat: repeat;
				background-position: center top;
			}
			.es-wrapper-color {
				background-color: #f4f4f4;
			}
			.es-header {
				background-color: #ffa73b;
				background-image: ;
				background-repeat: repeat;
				background-position: center top;
			}
			.es-header-body {
				background-color: transparent;
			}
			.es-header-body p,
			.es-header-body ul li,
			.es-header-body ol li {
				color: #666666;
				font-size: 14px;
			}
			.es-header-body a {
				color: #111111;
				font-size: 14px;
			}
			.es-content-body {
				background-color: #ffffff;
			}
			.es-content-body p,
			.es-content-body ul li,
			.es-content-body ol li {
				color: #666666;
				font-size: 18px;
			}
			.es-content-body a {
				color: #ffa73b;
				font-size: 18px;
			}
			.es-footer {
				background-color: transparent;
				background-image: ;
				background-repeat: repeat;
				background-position: center top;
			}
			.es-footer-body {
				background-color: transparent;
			}
			.es-footer-body p,
			.es-footer-body ul li,
			.es-footer-body ol li {
				color: #666666;
				font-size: 14px;
			}
			.es-footer-body a {
				color: #111111;
				font-size: 14px;
			}
			.es-infoblock,
			.es-infoblock p,
			.es-infoblock ul li,
			.es-infoblock ol li {
				line-height: 120%;
				font-size: 12px;
				color: #cccccc;
			}
			.es-infoblock a {
				font-size: 12px;
				color: #cccccc;
			}
			h1 {
				font-size: 48px;
				font-style: normal;
				font-weight: normal;
				color: #111111;
			}
			h2 {
				font-size: 24px;
				font-style: normal;
				font-weight: normal;
				color: #111111;
			}
			h3 {
				font-size: 20px;
				font-style: normal;
				font-weight: normal;
				color: #111111;
			}
			.es-header-body h1 a,.es-content-body h1 a,.es-footer-body h1 a {
				font-size: 48px;
			}
			.es-header-body h2 a,.es-content-body h2 a,.es-footer-body h2 a {
				font-size: 24px;
			}
			.es-header-body h3 a,.es-content-body h3 a,.es-footer-body h3 a {
				font-size: 20px;
			}
			a.es-button, button.es-button {
				border-style: solid;
				border-color: #ffa73b;
				border-width: 15px 25px 15px 25px;
				display: inline-block;
				background: #ffa73b;
				border-radius: 2px;
				font-size: 20px;
				font-family: helvetica, 'helvetica neue', arial, verdana, sans-serif;
				font-weight: normal;
				font-style: normal;
				line-height: 120%;
				color: #ffffff;
				text-decoration: none;
				width: auto;
				text-align: center;
			}
			.es-button-border {
				border-style: solid solid solid solid;
				border-color: #ffa73b #ffa73b #ffa73b #ffa73b;
				background: 1px;
				border-width: 1px 1px 1px 1px;
				display: inline-block;
				border-radius: 2px;
				width: auto;
			}
			.es-button img {
				display: inline-block;
				vertical-align: middle;
			}
			/* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
			@media only screen and (max-width: 600px) {
				p,
				ul li,
				ol li,
				a {
					line-height: 150% !important;
				}
				h1,h2,h3,h1 a,h2 a,h3 a {
					line-height: 120% !important;
				}
				h1 {
					font-size: 30px !important;
					text-align: center;
				}
				h2 {
					font-size: 26px !important;
					text-align: center;
				}
				h3 {
					font-size: 20px !important;
					text-align: center;
				}
				.es-header-body h1 a,.es-content-body h1 a,.es-footer-body h1 a {
					font-size: 30px !important;
				}
				.es-header-body h2 a,.es-content-body h2 a,.es-footer-body h2 a {
					font-size: 26px !important;
				}
				.es-header-body h3 a,.es-content-body h3 a,.es-footer-body h3 a {
					font-size: 20px !important;
				}
				.es-menu td a {
					font-size: 16px !important;
				}
				.es-header-body p,
				.es-header-body ul li,
				.es-header-body ol li,
				.es-header-body a {
					font-size: 16px !important;
				}
				.es-content-body p,.es-content-body ul li,.es-content-body ol li,.es-content-body a {
					font-size: 16px !important;
				}
				.es-footer-body p,
				.es-footer-body ul li,
				.es-footer-body ol li,
				.es-footer-body a {
					font-size: 16px !important;
				}
				.es-infoblock p,
				.es-infoblock ul li,
				.es-infoblock ol li,
				.es-infoblock a {
					font-size: 12px !important;
				}
				*[class="gmail-fix"] {
					display: none !important;
				}
				.es-m-txt-c,
				.es-m-txt-c h1,
				.es-m-txt-c h2,
				.es-m-txt-c h3 {
					text-align: center !important;
				}
				.es-m-txt-r,
				.es-m-txt-r h1,
				.es-m-txt-r h2,
				.es-m-txt-r h3 {
					text-align: right !important;
				}
				.es-m-txt-l,
				.es-m-txt-l h1,
				.es-m-txt-l h2,
				.es-m-txt-l h3 {
					text-align: left !important;
				}
				.es-m-txt-r img,
				.es-m-txt-c img,
				.es-m-txt-l img {
					display: inline !important;
				}
				.es-button-border {
					display: block !important;
				}
				a.es-button, button.es-button {
					font-size: 20px !important;
					display: block !important;
					border-width: 15px 25px 15px 25px !important;
				}
				.es-btn-fw {
					border-width: 10px 0px !important;
					text-align: center !important;
				}
				.es-adaptive table,
				.es-btn-fw,
				.es-btn-fw-brdr,
				.es-left,
				.es-right {
					width: 100% !important;
				}
				.es-content table,
				.es-header table,
				.es-footer table,
				.es-content,
				.es-footer,
				.es-header {
					width: 100% !important;
					max-width: 600px !important;
				}
				.es-adapt-td {
					display: block !important;
					width: 100% !important;
				}
				.adapt-img {
					width: 100% !important;
					height: auto !important;
				}
				.es-m-p0 {
					padding: 0px !important;
				}
				.es-m-p0r {
					padding-right: 0px !important;
				}
				.es-m-p0l {
					padding-left: 0px !important;
				}
				.es-m-p0t {
					padding-top: 0px !important;
				}
				.es-m-p0b {
					padding-bottom: 0 !important;
				}
				.es-m-p20b {
					padding-bottom: 20px !important;
				}
				.es-mobile-hidden,
				.es-hidden {
					display: none !important;
				}
				tr.es-desk-hidden,
				td.es-desk-hidden,
				table.es-desk-hidden {
					width: auto!important;
					overflow: visible!important;
					float: none!important;
					max-height: inherit!important;
					line-height: inherit!important;
				}
				tr.es-desk-hidden {
					display: table-row !important;
				}
				table.es-desk-hidden {
					display: table !important;
				}
				td.es-desk-menu-hidden {
					display: table-cell!important;
				}
				.es-menu td {
					width: 1% !important;
				}
				table.es-table-not-adapt,
				.esd-block-html table {
					width: auto !important;
				}
				table.es-social {
					display: inline-block !important;
				}
				table.es-social td {
					display: inline-block !important;
				}
			}
			/* END RESPONSIVE STYLES */
			.es-p-default {
				padding-top: 20px;
				padding-right: 30px;
				padding-bottom: 0px;
				padding-left: 30px;
			}
			.es-p-all-default {
				padding: 0px;
			}
        </style>
    </head
    <body>
		<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings ui-droppable" valign="top">
                    <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody class="ui-droppable">
                        <tr class="ui-draggable">
                        <td
                            class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                            width="580"
                            valign="top"
                            align="center"
                            esd-handler-name="containerHandler"
                        >
                            <table
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            >
                            <tbody class="ui-droppable">
                                <tr class="ui-draggable">
                                <td
                                    class="esd-block-text es-p35t es-p5b es-p30r es-p30l esd-frame esd-hover esd-draggable esd-block esdev-enable-select"
                                    align="center"
                                    esd-handler-name="textElementHandler"
                                >
                                    <h1
                                    style="
                                        color: #464545;
                                        font-family: 'open sans',
                                        'helvetica neue', helvetica, arial,
                                        sans-serif;
                                    "
                                    >
                                    Talent to serve
                                    </h1>
                                    <p
                                    style="
                                        color: #464545;
                                        font-size: 16px;
                                    "
                                    >
                                    Portal hotelero
                                    </p>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>
                        <table
                        style="
                            background-color: #ffffff;
                            border-radius: 4px;
                            border-collapse: separate;
                        "
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        >
                        <tbody class="ui-droppable">
                            <tr class="ui-draggable">
                            <td
                                class="esd-block-image es-p25t es-p25b es-p10r es-p10l esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                align="center"
                                style="font-size: 0px"
                                esd-handler-name="imgBlockHandler"
                            >
                                <a href="" target="_blank"
                                ><img
                                    src="https://talenttoserve.com/img/image55.png"
                                    alt=""
                                    style="display: block"
                                    width="140"
                                /></a>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table
                        style="
                            border-radius: 4px;
                            border-collapse: separate;
                            background-color: #ffffff;
                        "
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        >
                        <tbody class="ui-droppable">
                            <tr class="ui-draggable">
                            <td
                                class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                bgcolor="#ffffff"
                                align="center"
                                esd-handler-name="textElementHandler"
                            >
								<p style="line-height: 200%">
                                Hola ${nombre}
                                </p>
                                <p style="line-height: 200%">
                                Aquí esta tu contraseña para que
                                puedas entrar el portal
                                </p>
                            </td>
                            </tr>
                            <tr class="ui-draggable">
                            <td
                                class="esd-block-text es-p20t es-p30r es-p30l es-m-txt-l esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                align="center"
                                esd-handler-name="textElementHandler"
                            >
                                <p
                                style="
                                    color: #ee700d;
                                    font-size: 24px;
                                "
                                >
                                <strong>${passphrase}</strong>
                                </p>
                            </td>
                            </tr>
                            <tr class="ui-draggable">
                            <td
                                class="esd-block-button es-p35t es-p35b es-p10r es-p10l esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                align="center"
                                esd-handler-name="btnBlockHandler"
                            >
                                <span
                                class="es-button-border"
                                style="border-radius: 30px"
                                ><a
                                    href="https://www.talenttoserve.com/login"
                                    class="es-button es-button-1644622080315"
                                    target="_blank"
                                    style="
                                    border-width: 15px 30px;
                                    border-radius: 30px;
                                    "
                                    >Login</a
                                ></span
                                >
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
`,
		// attachments: [
		// 	{
		// 		filename: "logo.png",
		// 		path: __dirname + "../../../../public//logo.png",
		// 		cid: "logo", //my mistake was putting "cid:logo@cid" here!
		// 	},
		// ], // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	console.log(`Se ha enviado la clave ${passphrase} al email ${email}.`);
	return true;
}
export async function login(parentValue, { email, password }, context) {
	// console.log('context', context)

	const usuario_bd = await models.Usuario.findOne({
		attributes: { exclude: ["password", "passphrase"] },
		where: { email },
	});
	if (!usuario_bd) {
		throw new Error(
			`No tenemos ningún usuario registrado con el email ${email}. Por favor regístrese.`
		);
	} else {
		var pass = config.passphrase;
		var decrypted = CryptoJS.AES.decrypt(password, pass);
		var passDecryp = decrypted.toString(CryptoJS.enc.Utf8);
		const datosUsuarioDetalles = usuario_bd.get();
		const usuario = await buscar_usuario(email);
		// console.log("usuario", usuario);
		if (datosUsuarioDetalles.estado) {
			const router = await rutas(usuario.id_perfil);
			return await bcrypt
				.compare(passDecryp, datosUsuarioDetalles.password_new)
				.then((result) => {
					console.log("result", result);
					if (result) {
						var data = {
							datosUsuario: usuario,
							routers: router,
						};
						return {
							token: jwt.sign(data, config.secret),
						};
					} else {
						throw new Error(
							`Lo sentimos, la contraseña que ingresaste es incorrecta. Inténtalo de nuevo.`
						);
					}
				})
				.catch((err) => {
					throw new Error(`${err}`);
				});
		} else {
			throw new Error(
				`El usuario se encuentra inactivo, favor ponte en contacto con pborges@talenttoserve.com para activar la cuenta.`
			);
		}
	}
}
export async function sendPass(parentValue, { email }, context) {
	// console.log('context', context)

	const usuario_bd = await models.Usuario.findOne({
		attributes: { exclude: ["password"] },
		where: { email },
	});
	if (!usuario_bd) {
		throw new Error(
			`No tenemos ningún usuario registrado con el email ${email}. Por favor regístrese.`
		);
	} else {
		const datosUsuarioDetalles = usuario_bd.get();
		const usuario = await buscar_usuario(email);
		// console.log("usuario", usuario);
		if (datosUsuarioDetalles.estado) {
			const passphrase = datosUsuarioDetalles.passphrase;
			const nombre = datosUsuarioDetalles.nombre;
			const resp = sendMail(email, passphrase, nombre);
			return {
				send: resp,
			};
		} else {
			throw new Error(
				`El usuario se encuentra inactivo, favor ponte en contacto con pborges@talenttoserve.com para activar la cuenta.`
			);
		}
	}
}
// export async function loginGoogle(parentValue, { token}) {
//     const user = decode(token)
// 	// const usuario = await models.Usuario.findOne({ where: { email: user.email } })
//     const usuario = await models.Usuario.findOne({ attributes: { exclude: ['password','passphrase'] },where: { email: user.email } })
//     if (usuario) {
//         const datosUsuarioDetalles = usuario.get()
//         // const empresa = await models.Empresa.findOne({ where: { empresa_id: datosUsuarioDetalles.empresa_id } })
//         const router = await rutas(usuario.id_perfil)
//         var data = {
//             datosUsuario:datosUsuarioDetalles,
//             datosEmpresa: empresa,
//             routers:router
//         }
//         return {
//             token: jwt.sign(data, config.secret)
//         }

//     } else {
//         console.log(user)
//         var creado = false
//         var crear = {
//             nombre : user.name,
//             email : user.email,
//             avatar: user.picture
//         }
//         await models.Usuario.create(crear).then(cre => {
//             creado = true
//         }).catch(err => {
//             console.log(err)
//             error = err
//         })
//         if(creado){
//             var nuevo_usuario = await models.Usuario.findOne({ where: { email: user.email } })
//             const datosUsuarioDetalles = nuevo_usuario.get()
//             const router = await rutas(usuario.id_perfil)
//             var data = {
//                 datosUsuario:datosUsuarioDetalles,
//                 routers:router
//             }
//             return {
//                 token: jwt.sign(data, config.secret)
//             }
//         }
//         else{
//             throw new Error(`Error al crear el usuario ` + error)
//         }

//     }
// }
