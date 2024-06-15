require 'rails_helper'

RSpec.describe "Students", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/student/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/student/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/student/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/student/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
