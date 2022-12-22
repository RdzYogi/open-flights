class Airline < ApplicationRecord
  has_many :reviews

  # We will use the slug to find the airline instead of the id for the URL
  before_create :slugify

  def slugify
    self.slug = name.parameterize
  end

  def avg_score
    #  If there are reviews, return the average score, otherwise return 0
    reviews.count.positive? ? reviews.average(:score).round(2).to_f : 0
  end
end
