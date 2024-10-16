const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  apartment: {
    type: String,
    trim: true,
    default: null,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v); // Validates Indian PIN code format
      },
      message: (props) => `${props.value} is not a valid postal code!`,
    },
  },
  country: {
    type: String,
    trim: true,
    default: "India",
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?\d{10,15}$/.test(v); // Basic validation for phone numbers
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  addressType: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  geolocation: {
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  notes: {
    type: String,
    trim: true,
    default: "",
  },
});
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
