CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(256) NOT NULL,
  content VARCHAR(512) NOT NULL,
  score INT NOT NULL
);

INSERT INTO reviews (title, content, score) VALUES 
  ('Journey', 'Extremely overrated game.  Too much sand.', 6),
	('Undertale', 'One word: epic.', 10),
	('Pokemon Sun', 'Terribly written story and characters and far too easy.', 6),
	('Breath of the Wild', 'Uhhhhh wow.  Almost as good as everyone says it is.', 9);

GRANT ALL ON reviews TO gh_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO gh_user;