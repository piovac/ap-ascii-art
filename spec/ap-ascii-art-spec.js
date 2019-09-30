'use babel';

import ApAsciiArt from '../lib/ap-ascii-art';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ApAsciiArt', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('ap-ascii-art');
  });

  describe('when the ap-ascii-art:convert event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.ap-ascii-art')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ap-ascii-art:convert');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.ap-ascii-art')).toExist();

        let asciiArtElement = workspaceElement.querySelector('.ap-ascii-art');
        expect(asciiArtElement).toExist();

        let asciiArtPanel = atom.workspace.panelForItem(asciiArtElement);
        expect(asciiArtPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'ap-ascii-art:convert');
        expect(asciiArtPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.ap-ascii-art')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ap-ascii-art:convert');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let asciiArtElement = workspaceElement.querySelector('.ap-ascii-art');
        expect(asciiArtElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'ap-ascii-art:convert');
        expect(asciiArtElement).not.toBeVisible();
      });
    });
  });
});
