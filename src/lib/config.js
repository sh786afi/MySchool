export const configurationFile = {
  development: {
    //FOR MONGODB THINGS
    mongoUrl: "mongodb://localhost:27017/SchoolDB",
    API_DOMAIN_NAME: "http://localhost:3000/",
    JWT_SECRET: "thisisasecretformyapp"
  },

  test: {
    mongoUrl: "mongodb://localhost:27017/SchoolDB_Test",
    API_DOMAIN_NAME: "http://localhost:3000/",
    JWT_SECRET: "thisisasecretformyapp"
  }
};
