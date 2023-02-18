class Todo {
  text;
  categoryId;
  constructor({ text, categoryId }) {
    this.text = text;
    this.categoryId = categoryId;
  }
}

module.exports = Todo;
