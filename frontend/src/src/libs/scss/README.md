# Pre-require of install Compass (Recommend) / SASS
     Download and Install RubyInstaller (http://rubyinstaller.org/)

# Install SASS (or need "sudo" command if using Mac/Linux || cmd should "Run as Admin" if using Windows)
    $ gem install sass


# Compile SASS/SCSS by SASS
    $ sass <src_dir>/<filename>.scss:<target_dir>/<filename>.css

# Auto Compile SASS/SCSS by SASS (not support for changing "@use" file, if this case, please use compass to compile)
    $ sass --watch  <src_dir>/<filename>.scss:<target_dir>/<filename>.css

# Install Compass (or need "sudo" command if using Mac/Linux || cmd should "Run as Admin" if using Windows)
    $ gem update --system
    $ gem install compass

# Config Compass Compile
    $ compass config
    (Windows)
    $ move config/compass.rb config.rb
    (Mac/Linux)
    $ mv config/compass.rb config.rb
    
    (All User)
    Use Text Editor / vi (for mac/linux) edit config and save

# Compile SCSS by Compass
    $ compass compile

# Auto Compile SCSS by Compass
    $ compass watch

# SCSS Directory Usage
    1. base/* -> Normalise Browser behaviours
    2. helper/* -> animation/functions/common class/mixins/variables
    3. vendor/* -> 3rd parties css
    4. themes/* -> Specific for themes
    5. modules/* -> Self Dev Modules
    6. layout/* -> Common layout
    7. pages/* -> Customise for each page

# SCSS import sequence
    1. base/*
    2. helper/*
    3. vendor/*
    4. themes/*
    5. modules/*
    6. layout/*
    7. pages/*