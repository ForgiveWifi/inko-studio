import mongoose from "mongoose"
const { Schema, model } = mongoose 

const PlacementSchema = Schema({
  _id: false,
  placement: {  
    type: String,
    required: true,
    enum: {
      values: ['Front Center', 'Back Center', 'Front Left Chest', 'Front Right Chest', 'Neck'],
      message: '{VALUE} is not supported placement'
    }
  },
  art_file: {
    type: String,
    required: true,
  },
  art_url: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  underbase: {
    type: Boolean,
    required: true,
    default: true
  },
  x_offset: {
    type: Number,
    required: true,
  },
  y_offset: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
    min: 1
  },
  height: {
    type: Number,
    required: true,
    min: 1
  }
})

const TagSchema = Schema({
  _id: {
    type: String,
    required: true,
  },
  tags: [{
    _id: false,
    size: {
      type: String,
      required: true
    },
    pallet: {
      type: String,
      required: true
    },
    design: {
      type: PlacementSchema,
      required: true
    }
  }]

})

export default mongoose.models.Tag || model("Tag", TagSchema)