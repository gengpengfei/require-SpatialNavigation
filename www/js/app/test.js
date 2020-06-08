require(['jquery','i18n!nls/language','navigation'],function($,language,SpatialNavigation) {
      $(function() {
        // A short name of the SpatialNavigation singleton object.
        var SN = SpatialNavigation;
        // Initialize
        SN.init();

        // Add the first section "menu".
        SN.add({
          id: 'menu',
          selector: '#menu .focusable',

          // Force to focus the "#button-settings" when entering this section.
          defaultElement: '#button-settings',
          enterTo: 'default-element'
        });

        // Add the second section "middlebox".
        SN.add({
          id: 'middlebox',
          selector: '#middlebox .focusable',

          // Focus the last focused element first then entering this section.
          enterTo: 'last-focused'
        });

        // Add the third section "settings-dialog".
        //
        // Any invisible elements can't be navigated at all so we can add this
        // section at anytime and don't need to concern their current status.
        SN.add({
          id: 'settings-dialog',
          selector: '#settings-dialog .focusable',

          // Since it's a standalone dialog, we restrict its navigation to
          // itself so the focus won't be moved to another section.
          restrict: 'self-only',

          // Note that we don't set "enterTo" to "default-element" in this
          // section because it's impossible to enter this section from the
          // others by arrow keys. This default element will only affect the
          // "focus('settings-dialog')" API call.
          defaultElement: '#button-cancel'
        });

        // Expand the "button-function" area.
        $('#button-function').on('sn:focused', function() {
          $('#button-function-area .sub-button').removeClass('hide');
        });

        // Collapse the "button-function" area.
        $('#button-function-area .button').on('sn:unfocused', function() {
          // Use "setTimeout" to defer the action so that we can get the next
          // focused element.
          setTimeout(function() {
            if (!$(':focus').is('#button-function-area .button')) {
              $('#button-function-area .sub-button').addClass('hide');
            }
          });
        });

        // Implement "ensureVisible" feature.
        $('#middlebox .focusable').on('sn:willfocus', function() {
          SN.pause();
          $(this).ensureVisible(function() {
            SN.focus(this);
            SN.resume();
          });
          return false;
        });

        $('.focusable')
          .on('sn:enter-down', function() {
            // Add "clicking" style.
            $(this).addClass('active');
          })
          .on('sn:enter-up', function() {
            var id = this.id;
            var $this = $(this);

            // Remove "clicking" style.
            $this.removeClass('active');

            // Do related actions according to the id of element.
            if (id.substr(0, 9) == 'settings-') {
              $this.find('i').toggleClass('fa-check');
            } else {
              switch(id) {
                case 'button-settings':
                  // Show the settings dialog
                  $('#settings-container').removeClass('hide');

                  // Move focus to section "settings-dialog"
                  SN.focus('settings-dialog');
                  break;
                case 'button-save':
                case 'button-cancel':
                  // Hide the settings dialog
                  $('#settings-container').addClass('hide');

                  // Move focus back to section "menu".
                  SN.focus('menu');
                  break;
              }
            }

            // For testing only.
            console.log(id);
          });

        // Press ESC key to dismiss the settings dialog.
        $(window).keydown(function(evt) {
          if (evt.keyCode == 27 && !$('#settings-container').hasClass('hide')) {
            $('#settings-container').addClass('hide');
            SN.focus('menu');
            return false;
          }
        });

        // Set everything with "tabindex=-1".
        SN.makeFocusable();

        // Focus section "middlebox" by default.
        SN.focus('middlebox');
      });
})
