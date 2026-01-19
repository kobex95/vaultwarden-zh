all:
	python docker/render_template docker/Dockerfile.j2 '{"base": "debian"}' > docker/Dockerfile.debian
	python docker/render_template docker/Dockerfile.j2 '{"base": "alpine"}' > docker/Dockerfile.alpine
.PHONY: all
