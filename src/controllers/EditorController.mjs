export default class EditorController {
  constructor(io, pool) {
    this.io = io;
    this.pool = pool;
  }

  guardarContenido(data) {
    this.pool.query(
      "UPDATE documentos SET texto = $1 WHERE id = $2",
      [data.content, data.documentId],
      (error, result) => {
        if (error) {
          console.error("Error al guardar el contenido:", error);
        } else {
          console.log("Contenido guardado exitosamente: ", result.rows);
        }
      }
    );
  }

  leerContenido(data) {	
    return new Promise((resolve, reject) => {
      this.pool.query(
        "SELECT texto FROM documentos WHERE id = $1",
        [data.documentId],
        (error, result) => {
          if (error) {
            console.error("Error al leer el contenido:", error);
            reject(error);
          } else {
            console.log("Contenido leído exitosamente");
            console.log(result.rows);
            resolve(result.rows);
          }
        }
      );
    });
  }

  async leerNotas() {
    return new Promise((resolve, reject) => {
      this.pool.query("SELECT * FROM notes", (error, result) => {
        if (error) {
          console.error("Error al leer las notas:", error);
          reject(error);
        } else {
          console.log("Notas leídas exitosamente");
          console.log(result.rows);
          resolve(result.rows);
        }
      });
    });
  }

}
