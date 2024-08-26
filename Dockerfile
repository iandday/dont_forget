FROM python:3.12-alpine as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apk add --update --virtual .build-deps \
    build-base \
    postgresql-dev \
    python3-dev \
    libpq \
    libpq-dev \
    libffi-dev

WORKDIR /app
COPY ./pyproject.toml /app/pyproject.toml
RUN pip install --upgrade pip && \
    pip install .

#---------------------------Dev Build------------------------#
FROM python:3.12-alpine as dev

ARG USERNAME=appuser
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV USERNAME=$USERNAME
ENV USER_UID=$USER_UID
ENV USER_GID=$USER_GID

RUN apk add libpq git openssh-client ca-certificates
COPY --from=base /usr/local/lib/python3.12/site-packages/ /usr/local/lib/python3.12/site-packages/
COPY --from=base /usr/local/bin/ /usr/local/bin/

WORKDIR /app
COPY ./pyproject.toml /app/pyproject.toml
RUN pip install '.[dev]'

RUN addgroup  -g $USER_GID $USERNAME \
    && adduser -S $USERNAME -G $USERNAME -D -s /bin/sh

RUN chown $USERNAME:$USERNAME /app
COPY --chown=$USERNAME:$USERNAME ./ /app

USER $USERNAME
RUN pre-commit install --install-hooks
RUN pre-commit install --hook-type commit-msg

USER $USERNAME
WORKDIR /app/backend
EXPOSE 8000
ENTRYPOINT ["ash", "docker-entrypoint.sh"]

#---------------------------Prod Build------------------------#
FROM python:3.12-alpine

ARG USERNAME=appuser
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV USERNAME=$USERNAME
ENV USER_UID=$USER_UID
ENV USER_GID=$USER_GID

RUN apk add libpq
COPY --from=base /usr/local/lib/python3.12/site-packages/ /usr/local/lib/python3.12/site-packages/
COPY --from=base /usr/local/bin/ /usr/local/bin/

RUN addgroup  -g $USER_GID $USERNAME \
    && adduser -S $USERNAME -G $USERNAME -D -s /bin/sh
USER $USERNAME

WORKDIR /app
COPY --chown=appuser:appuser ./backend /app

WORKDIR /app
EXPOSE 8000
ENTRYPOINT ["ash", "docker-entrypoint.sh"]


