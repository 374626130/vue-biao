"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_elementUi.Pagination);

_vue["default"].use(_elementUi.Dialog);

_vue["default"].use(_elementUi.Autocomplete);

_vue["default"].use(_elementUi.Dropdown);

_vue["default"].use(_elementUi.DropdownMenu);

_vue["default"].use(_elementUi.DropdownItem);

_vue["default"].use(_elementUi.Menu);

_vue["default"].use(_elementUi.Submenu);

_vue["default"].use(_elementUi.MenuItem);

_vue["default"].use(_elementUi.MenuItemGroup);

_vue["default"].use(_elementUi.Input);

_vue["default"].use(_elementUi.InputNumber);

_vue["default"].use(_elementUi.Radio);

_vue["default"].use(_elementUi.RadioGroup);

_vue["default"].use(_elementUi.RadioButton);

_vue["default"].use(_elementUi.Checkbox);

_vue["default"].use(_elementUi.CheckboxButton);

_vue["default"].use(_elementUi.CheckboxGroup);

_vue["default"].use(_elementUi.Switch);

_vue["default"].use(_elementUi.Select);

_vue["default"].use(_elementUi.Option);

_vue["default"].use(_elementUi.OptionGroup);

_vue["default"].use(_elementUi.Button);

_vue["default"].use(_elementUi.ButtonGroup);

_vue["default"].use(_elementUi.Table);

_vue["default"].use(_elementUi.TableColumn);

_vue["default"].use(_elementUi.DatePicker);

_vue["default"].use(_elementUi.TimeSelect);

_vue["default"].use(_elementUi.TimePicker);

_vue["default"].use(_elementUi.Popover);

_vue["default"].use(_elementUi.Tooltip);

_vue["default"].use(_elementUi.Breadcrumb);

_vue["default"].use(_elementUi.BreadcrumbItem);

_vue["default"].use(_elementUi.Form);

_vue["default"].use(_elementUi.FormItem);

_vue["default"].use(_elementUi.Tabs);

_vue["default"].use(_elementUi.TabPane);

_vue["default"].use(_elementUi.Tag);

_vue["default"].use(_elementUi.Tree);

_vue["default"].use(_elementUi.Alert);

_vue["default"].use(_elementUi.Slider);

_vue["default"].use(_elementUi.Icon);

_vue["default"].use(_elementUi.Row);

_vue["default"].use(_elementUi.Col);

_vue["default"].use(_elementUi.Upload);

_vue["default"].use(_elementUi.Progress);

_vue["default"].use(_elementUi.Spinner);

_vue["default"].use(_elementUi.Badge);

_vue["default"].use(_elementUi.Card);

_vue["default"].use(_elementUi.Rate);

_vue["default"].use(_elementUi.Steps);

_vue["default"].use(_elementUi.Step);

_vue["default"].use(_elementUi.Carousel);

_vue["default"].use(_elementUi.CarouselItem);

_vue["default"].use(_elementUi.Collapse);

_vue["default"].use(_elementUi.CollapseItem);

_vue["default"].use(_elementUi.Cascader);

_vue["default"].use(_elementUi.ColorPicker);

_vue["default"].use(_elementUi.Transfer);

_vue["default"].use(_elementUi.Container);

_vue["default"].use(_elementUi.Header);

_vue["default"].use(_elementUi.Aside);

_vue["default"].use(_elementUi.Main);

_vue["default"].use(_elementUi.Footer);

_vue["default"].use(_elementUi.Timeline);

_vue["default"].use(_elementUi.TimelineItem);

_vue["default"].use(_elementUi.Link);

_vue["default"].use(_elementUi.Divider);

_vue["default"].use(_elementUi.Image);

_vue["default"].use(_elementUi.Calendar);

_vue["default"].use(_elementUi.Backtop);

_vue["default"].use(_elementUi.PageHeader);

_vue["default"].use(_elementUi.CascaderPanel);

_vue["default"].use(_elementUi.Loading.directive);

_vue["default"].prototype.$loading = _elementUi.Loading.service;
_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert;
_vue["default"].prototype.$confirm = _elementUi.MessageBox.confirm;
_vue["default"].prototype.$prompt = _elementUi.MessageBox.prompt;
_vue["default"].prototype.$notify = _elementUi.Notification;
_vue["default"].prototype.$message = _elementUi.Message;