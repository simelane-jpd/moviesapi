create table users(
	id serial not null primary key,
	firstname text,
	lastname text,
	username text,
	password text,
	
);

create table playlist (
	playlistid serial not null primary key,
	personsid int,
	moviename text,
	foreign key (personsid) references users(id)
	
	
	
)