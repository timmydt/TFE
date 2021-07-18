try {
} catch (error) {
  console.log(error)
  res.status(400).send("Une erreur est survenue")
}
