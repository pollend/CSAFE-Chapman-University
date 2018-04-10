Hashid::Rails.configure do |config|
  # The salt to use for generating hashid. Prepended with table name.
  config.salt = "948vb7ra9wnr7a8w7jrum12380ljfsalawoeq"

  # The minimum length of generated hashids
  config.min_hash_length = 6

  # The alphabet to use for generating hashids
  config.alphabet = "abcdefghijklmnopqrstuvwxyz" \
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" \
                    "1234567890"

  # Whether to override the `find` method
  config.override_find = true

  # Whether to sign hashids to prevent conflicts with regular IDs (see https://github.com/jcypret/hashid-rails/issues/30)
  config.sign_hashids = true
end