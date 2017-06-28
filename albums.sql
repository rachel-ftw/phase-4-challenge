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
  ('A Person', 'a@a.a', 'a', 'https://m.popkey.co/b889d7/OwGXE.gif'),
  ('Rachel Ralston', 'r@r.r', 'r', 'https://media.giphy.com/media/xT77Y8eeEhBA8NQwLK/giphy.gif')
;

INSERT INTO
  reviews (album_id, user_id, review)
VALUES
  (1,2,'Album: Malibu. Reviewer: A. Person. I love this album so much! Its one of my all time favorites!'),
  (2,1,'Album: A Seat at the Table. Reviewer: Miss Adventure Cat. Never again will I trust a human being.'),
  (2,2, 'Album: A Seat at the Table. Reviewer: A. Person. Im a revieww.  Each requirement has a point value. A fully complete requirement gets full points; partially complete requirements get partial points; incomplete requirements get no points. Completeness is determined by calculating points earned divided by total points available'),
  (3,3, 'Album: Melodrama, Reviewer: Rachel Ralston A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.[1][2] Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.')
