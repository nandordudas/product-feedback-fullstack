# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon):
# 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# ENV DEBIAN_FRONTEND=noninteractive
# RUN \
#   apt-get update && \
#   apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"

ARG USERNAME

# https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
ENV PROMPT_COMMAND="history -a"
ENV HISTFILE=/commandhistory/.bash_history

RUN \
  mkdir /commandhistory && \
  touch /commandhistory/.bash_history && \
  chown -R $USERNAME /commandhistory

# https://code.visualstudio.com/remote/advancedcontainers/avoid-extension-reinstalls
RUN \
  mkdir -p /home/$USERNAME/.vscode-server/extensions && \
  mkdir -p /home/$USERNAME/.local/share/pnpm/store && \
  chown -R $USERNAME /home/$USERNAME/.vscode-server /home/$USERNAME/.local/share

# Change user from root to node
USER $USERNAME

RUN \
  curl -L git.io/antigen >/home/$USERNAME/antigen.zsh && \
  echo "source /home/${USERNAME}/.aliases" >>/home/$USERNAME/.zshrc && \
  echo "source /home/${USERNAME}/antigen.zsh" >>/home/$USERNAME/.zshrc && \
  echo "antigen init /home/${USERNAME}/.antigenrc" >>/home/$USERNAME/.zshrc

RUN \
  npm install -g pnpm @antfu/ni && \
  # Set custom storage directory for pnpm because of workspace type - https://pnpm.io/npmrc#store-dir
  pnpm config set store-dir /home/$USERNAME/.local/share/pnpm/store
