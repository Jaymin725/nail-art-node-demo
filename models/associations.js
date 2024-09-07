const likesModel = require("./likes");
const nailart_designModel = require("./nailart_design");

likesModel.belongsTo(nailart_designModel, { foreignKey: "post" });
nailart_designModel.hasMany(likesModel, { foreignKey: "post" });

module.exports = { likesModel, nailart_designModel };
