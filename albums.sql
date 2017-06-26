INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password, profile_pic)
VALUES
  ('Adventure Cat', 'cat@cat.cat', 'meow', 'https://s-media-cache-ak0.pinimg.com/originals/5d/87/07/5d8707e785e6d1c685855d2cc9be754c.jpg'),
  ('A Person', 'a@a.a', 'a', 'https://m.popkey.co/b889d7/OwGXE.gif')
;

INSERT INTO
  reviews (album_id, user_id, review)
VALUES
  (1,2,'Album: Malibu. Reviewer: A. Person. I love this album so much! Its one of my all time favorites!'),
  (2,1,'Album: A Seat at the Table. Reviewer: Miss Adventure Cat. Never again will I trust a human being.')
;
