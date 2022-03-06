<br>
<h1>
  👋 Welcome to Comet ☄️
</h1>
<br>
<p>
  ## Designed with Windows 11 in mind.
</p>
<p>
  ## Comet is a simple browser focused on User Interface & User Experience.
</p>
<br>
<p>
  ## This version of comet is in early development and everything is subject to change.
</p>
<br>
<h1>
  Screenshot(s)
</h1>
 <img src="https://user-images.githubusercontent.com/29758156/156919880-41b6b5a2-3b63-40ea-95af-738fb494bb2c.png">

<br>
<h1>
  📦 Download latest (pre-)release
</h1>

You can download the latest releases from [here.](https://github.com/asanull/comet-browser/releases/tag/pre-release)

<br>
<br id="rfs">
<h1>
 ☄️ Running from source
</h1>

### 1: Prerequisites

- [Git](https://git-scm.com)
- [Node & npm](https://nodejs.org/en/)

### 2: Clone the repository.

```ps
git clone https://github.com/asanull/comet-browser.git
```

This will create a local copy of the repository.

### 3: Install dependencies

```ps
cd comet-browser
```
```ps
npm install
```
or
```ps
cd comet-browser && npm install
```
'cd' will navigate to the local repository directory and 'npm install' will install all the dependencies included in package.json.

### 4: Run the project

```ps
npm run dev
```
That's it! you should now be running comet.
But we can take it a step further...

<br>
<br>
<h1>
 🔨 Building from source 
</h1>

### 1: Prerequisites

Follow steps 1 to 3 from '[🔨 Running from source](#rfs) '.
<br>
This should ensure that you already have all the correct prerequisites and dependencies set up.

### 2: Build the project

```ps
npx electron-forge import
```
```ps
npm run make
```
This will set up Forge's scaffolding and then create a distributable using Forge's make command.

### 3: Done

<p>
  There should now be an 'out' directory created by Forge where the package will be located.
  <br>
  The 'out' directory should look something like this:
 </p>
 <img src="https://user-images.githubusercontent.com/29758156/156674176-3072e05d-c951-471b-9a8e-b0cb5309a113.png">

<br>
