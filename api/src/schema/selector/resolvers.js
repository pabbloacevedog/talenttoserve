import models from '../../models'
import seq from 'sequelize';
const { QueryTypes } = seq;
export async function getSelect(parentValue, {tipo}) {
    console.log(tipo)
    let resp ;
    switch (tipo) {
        case 'pais':
            resp =  await models.sequelize.query(
                "   SELECT  " +
                "       u.id as value,   " +
                "       u.nombre as label   " +
                "   FROM    " +
                "       pais u   ",
                {
                    type: QueryTypes.SELECT
                }
            )
            break;
        case 'cargo':
            resp =  await models.sequelize.query(
                "   SELECT  " +
                "       u.codigo as value,   " +
                "       u.nombre as label   " +
                "   FROM    " +
                "       cargo u   ",
                {
                    type: QueryTypes.SELECT
                }
            )
            break;
        case 'perfil':
            resp =  await models.sequelize.query(
                    "   SELECT  " +
                    "       u.id_perfil as value,   " +
                    "       u.nombre as label   " +
                    "   FROM    " +
                    "       perfil u   ",
                    {
                        type: QueryTypes.SELECT
                    }
                )
                break;
        case 'categoria':
            resp =  await models.sequelize.query(
                    "   SELECT  " +
                    "       u.codigo as value,   " +
                    "       u.nombre as label   " +
                    "   FROM    " +
                    "       categoria u   ",
                    {
                        type: QueryTypes.SELECT
                    }
                )
                break;
    }
    console.log('resp', resp)
	return resp
}