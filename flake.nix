{
  description = "Ferreira Atemporal landing page";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.stdenvNoCC.mkDerivation (finalAttrs: {
            pname = "ferreira-atemporal";
            version = "1.0.0";

            src = ./.;

            pnpmDeps = pkgs.fetchPnpmDeps {
              inherit (finalAttrs) pname version src;
              pnpm = pkgs.pnpm_10;
              fetcherVersion = 3;
              hash = "sha256-45Cglr8c0BosoHMwbi8QQcJj39FNH2oRorUE3qVoC58=";
            };

            nativeBuildInputs = [
              pkgs.nodejs_22
              pkgs.pnpm_10
              pkgs.pnpmConfigHook
            ];

            buildPhase = ''
              runHook preBuild
              pnpm build
              runHook postBuild
            '';

            installPhase = ''
              runHook preInstall
              mkdir -p "$out"
              cp -R dist .netlify "$out/"
              runHook postInstall
            '';
          });
        });

      checks = forAllSystems (system: {
        landing-page = self.packages.${system}.default;
      });

      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_22
              pkgs.pnpm_10
              pkgs.netlify-cli
            ];
          };
        });
    };
}
