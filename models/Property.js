import { Schema, model, models } from "mongoose";
const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        // asset_id: {
        //   type: String,
        // },
        public_id: {
          type: String,
        },
        // version: {
        //   type: Number,
        // },
        // version_id: {
        //   type: String,
        // },
        signature: { type: String },
        // width: { type: Number },
        // height: { type: Number },
        // format: { type: String },
        // resource_type: { type: String },
        // created_at: { type: String },
        // tags: [],
        // bytes: { type: Number },
        // type: { type: String },
        // etag: { type: String },
        // placeholder: { type: Boolean },
        // url: { type: String },
        secure_url: { type: String },
        // folder: { type: String },
        // api_key: { type: String },
      },
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Property = models.Property || model("Property", PropertySchema);
export default Property;
