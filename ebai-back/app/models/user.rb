class User < ApplicationRecord
  has_secure_password
  has_many :auctions

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end
