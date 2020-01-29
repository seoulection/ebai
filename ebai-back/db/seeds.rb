User.create!({ first_name: 'Luke', last_name: 'Skywalker', email: 'luke@skywalker.com', password: 'UseTheForc3!' })
User.create!({ first_name: 'Leia', last_name: 'Skywalker', email: 'leia@skywalker.com', password: 'Skyw4lk3r#' })
User.create!({ first_name: 'Chewbacca', last_name: 'Wookie', email: 'chew@bacca.com', password: 'Grrrrrrrrrrrrr$3' })

Auction.create!(:title => 'Ric Flair Tshirt',
                :description => 'Make everyone laugh when you show off your favorite wrestler with this Ric Flair t shirt! This wrestling tee features the one and only Ric Flair, also known as Nature Boy, surrounded by his classic description of himself as Limousine ridin jet flyin kiss stealin wheelin dealin son of a gun. Throwback to this popular retro wrestler and make your fellow WWE fans smile.', 
                :current_bid_price => 100, :buy_it_now_price => 500, :end_date => DateTime.tomorrow, :user => User.find(1))
