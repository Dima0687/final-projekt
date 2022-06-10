

// create
function createOne(req, res, next){
  res.send('created')
}

// read
function getAll(req, res, next){
  res.send('getAll')
}

function getOne(req, res, next){
  res.send('getOne')
}

// update
function updateOne(req, res, next){
  res.send('update')
}

// delete
function deleteOne(req, res, next){
  res.send('delete')
}


export {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
}