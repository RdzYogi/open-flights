class Airline < ApplicationRecord
  has_many :reviews

  # We will use the slug to find the airline instead of the id for the URL
  before_create :slugify

  def slugify
    self.slug = name.parameterize
  end

  def avg_score
    reviews.average(:score).round(2).to_f
  end
end
