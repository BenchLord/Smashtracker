// get access to your model

var testController = {
  index: (req, res) => {
    res.render('test/index');
  },
  show: (req, res) => {
    res.render('test/show');
  }
}

module.exports = testController;
