import pg from 'pg-promise'
const pgp = pg()
const cstr = `postgresql://postgres:1256@localhost:5432/biblioteca`;
const db = pgp(cstr);

db.connect()
.then( ()=>{
    console.log("Conexion Exitosa");
} )
.catch( (err)=>{
    console.log(`Error de conexion ${err}`);
} )

export { db }