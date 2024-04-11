
import { Schema, model, models } from "mongoose"

 const BookSchema = new Schema({
 	Title: {
 		type: String,
 		required: true
 	},
 	Author: {
 		type: String,
 		required: [true, "You must provide an author"]
 	},
    Plot: {
        type: String,
        
    },
 	pages: Number,
 	summary: String,
 	cover: String
 }, {
	timestamps: true
})

export default models.Book || model("Book", BookSchema)