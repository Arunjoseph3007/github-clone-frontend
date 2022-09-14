[https://github.com/git/git/blob/ca1b4116483b397e78483376296bcd23916ab553/http-backend.c#L707-718]link

```C
{
	{"GET", "/HEAD$", get_head},
	{"GET", "/info/refs$", get_info_refs},
	{"GET", "/objects/info/alternates$", get_text_file},
	{"GET", "/objects/info/http-alternates$", get_text_file},
	{"GET", "/objects/info/packs$", get_info_packs},
	{"GET", "/objects/[0-9a-f]{2}/[0-9a-f]{38}$", get_loose_object},
	{"GET", "/objects/pack/pack-[0-9a-f]{40}\\.pack$", get_pack_file},
	{"GET", "/objects/pack/pack-[0-9a-f]{40}\\.idx$", get_idx_file},

	{"POST", "/git-upload-pack$", service_rpc},
	{"POST", "/git-receive-pack$", service_rpc}
};

```

