
- The app now posts native macOS notifications when a task finishes or needs your input, so you can leave Cline working in the background. Configure them under Settings → Notifications.
- Voice input: dictate into the composer with the microphone button and your speech is transcribed as you talk, using the provider and model you have configured.
- Commands stream their output into the transcript as they run instead of appearing all at once when the command exits. Output keeps its terminal colors, is scrollable without being yanked back to the bottom, and a long-running command can be sent to the background with "Proceed while running" so the agent moves on while it finishes.
- Models that support image generation can now produce images during a task, and they render inline in the transcript.
- Finished agent runs collapse into a single "Worked for 4m 12s and made 14 tool calls" summary you can expand, so the final answer stays in view instead of being buried under the working rows.
- Reasoning traces and tool rows now open and close with an animation instead of snapping, and respect your reduced-motion setting.
- Redesigned the question card the agent shows when it needs a decision: options are selected explicitly and submitted with a button, multiple-choice questions are supported, and there are arrow-key and A–Z shortcuts. Internal request IDs, iteration counts, and timestamps no longer appear on the card.
- The Web search toggle in Settings now explains that only providers with built-in web search honor it, and shows which of your connected providers are ready to use it — or warns you, with a link to Models, when none of them are.
- Refreshed assistant markdown — chat-scaled headings, quieter code blocks with a hover copy button, and table cards — now rendered through the same pipeline as the rest of Cline, so the desktop app and the cloud dashboard finally look alike.
- Message hover actions float over the transcript instead of reserving blank space under every message, so conversations pack more tightly.
- Restyled session hover cards: they open immediately, drop the duplicated ID and updated time, and no longer animate as you move down the list.
- There is now a separate "Cline Code Beta" app that installs side by side with this one and tracks the experimental branch. It identifies itself as beta in the sidebar, Settings, window title, and tray, so you always know which build you are in.
- Fixed turns that settle through the event stream — queued prompts, and the first prompt of a fresh session — staying stuck on the streaming shimmer with no final output, healing only when you sent another message. The transcript now reconciles against the saved history as soon as the turn ends.
- Fixed sessions being given the Yolo-mode system prompt whenever auto-approve was on, even though the runtime was started in Act mode. Auto-approval is now an independent tool policy and no longer changes the advertised mode.
- `/skill` and `/workflow` commands no longer dump the whole skill body into the chat as your message. Your typed command stays as typed, the model loads the instructions through the skills tool, and sessions are no longer titled with the first line of a skill's markdown. Sessions saved before this fix render compactly too.
- Fixed command execution breaking for an entire session when a model emitted a full command line with no separate arguments — anything containing a space failed with `ENOENT`.
- Restoring a checkpoint now trims the saved transcript too, so the chat no longer keeps showing turns whose file changes were just reverted.
- Gemini custom base URLs work again, including host-root values saved before the SDK migration and proxy roots like `http://localhost:4000/gemini`, which were silently missing the API version segment and 404ing.
- LiteLLM input token limits reported by the server are preserved instead of being replaced with a 128K default.
- Fixed misaligned columns in the Usage table, and added a See More link to the full usage dashboard.
- Fixed routine dialog dropdowns not responding to mouse clicks.

**Full Changelog**: https://github.com/cline/cline/compare/desktop-v0.0.13...desktop-v0.0.14
