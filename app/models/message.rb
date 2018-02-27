class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  mount_uploader :image, ImageUploader
  validates :body_or_image, presence: true
  def body_or_image
    body.present? || image.present?
  end
end
