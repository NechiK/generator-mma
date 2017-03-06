controller:
ifeq ($(M),)
	gulp generate --controller $(N)
else
	gulp generate --controller $(N) --module $(M)
endif

model:
ifeq ($(M),)
	gulp generate --model $(N)
else
	gulp generate --model $(N) --module $(M)
endif

directive:
ifeq ($(M),)
	gulp generate --directive $(N)
else
	gulp generate --directive $(N) --module $(M)
endif

routes:
ifeq ($(M),)
	gulp generate --routes $(N)
else
	gulp generate --routes $(N) --module $(M)
endif

module:
	gulp generate --module $(N)
