const fs = require("fs");

module.exports = class File {
  constructor(name) {
    this.name = `${__dirname}/db/${name}.json`;

    try {
      this.elements = fs.readFileSync(this.name, "utf-8");
      this.elements = JSON.parse(this.elements);
    } catch (error) {
      this.elements = [];
    }
  }

  getAll() {
    return this.elements;
  }

  getById(id) {
    try {
      let element = { id };
      for (let i = 0; i < this.elements.length; i++) {
        if (element.id == this.elements[i].id) {
          element = this.elements[i];
        }
      }

      return element;
    } catch (error) {
      return error;
    }
  }

  save(element) {
    try {
      if (this.elements.length == 0) {
        element.id = 1;
      } else {
        element.id = this.elements.length + 1;
      }
      this.elements.push(element);
      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
        .then(() => console.log("Elemento guardado"))
        .catch((e) => console.log(e));

      return { response: "Guardado", element };
    } catch (error) {
      console.log(error);
      return { response: "Error!", error };
    }
  }

  update(element) {
    try {
      let one = this.elements.find((el) => el.id == element.id);
      let newElement = { ...one, ...element };

      let index = this.elements.findIndex((el, ind) => {
        if (el.id == newElement.id) {
          return true;
        }
      });
      this.elements[index] = newElement;

      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
        .then(() => console.log("Actualizado"))
        .catch((e) => console.log(e));

      return { response: "Actualizado", element: newElement };
    } catch (error) {
      console.log(error);
      return { response: "Error!", error };
    }
  }

  delete() {
    fs.truncateSync(this.name, 0, () => console.log("Borrado"));
    return { response: "Todos los datos han sido eliminados" };
  }

  deleteById(id) {
    try {
      let index = this.elements.findIndex((el, ind) => {
        if (el.id == id) {
          return true;
        }
      });
      let element = this.elements.splice(index, 1);

      fs.promises
        .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
        .then((e) =>
          console.log(`El elemento con el id: ${id} fue borrado correctamente`)
        )
        .catch((e) => console.log(`${e}`));

      return { response: "Borrado", element };
    } catch (error) {
      console.log(error);
      return "Este ID no existe";
    }
  }
};
