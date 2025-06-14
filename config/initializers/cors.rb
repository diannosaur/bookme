Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001' # or wherever your React dev server runs

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options]
  end
end