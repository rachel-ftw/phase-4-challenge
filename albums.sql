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
  ('Adventure Cat', 'cat@cat.cat', 'meow', 'https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif'),
  ('A Person', 'a@a.a', 'a', 'https://m.popkey.co/b889d7/OwGXE.gif')
;

INSERT INTO
  reviews (album_id, user_id, review)
VALUES
  (1,2,'Album: Malibu. Reviewer: A. Person. I love this album so much! Its one of my all time favorites!'),
  (2,1,'Album: A Seat at the Table. Reviewer: Miss Adventure Cat. Never again will I trust a human being.')
;
