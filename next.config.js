const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  async headers() {
    return [
      {
        // Define the origin of your frontend app, e.g. http://localhost:8080
        source: isProduction ? 'https://junior-project-frontend.vercel.app/:path*' : '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: isProduction ? 'https://erlingjuniorproductsite.000webhostapp.com/products.php' : 'http://localhost:3000/products.php',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
        ],
      },
    ];
  },
};