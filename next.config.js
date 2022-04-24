module.exports = {
    env: {
      // Will be available on both server and client
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'development',
    },
  }